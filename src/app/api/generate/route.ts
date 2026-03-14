import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { toolConfigs } from '@/lib/tools'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Simple rate limiting in memory
const usageMap = new Map<string, { count: number; resetAt: number }>()
const FREE_LIMIT = 5 // 5 uses per day
const RATE_WINDOW = 24 * 60 * 60 * 1000 // 24 hours

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const usage = usageMap.get(ip)

  if (!usage || now > usage.resetAt) {
    usageMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return { allowed: true, remaining: FREE_LIMIT - 1 }
  }

  if (usage.count >= FREE_LIMIT) {
    return { allowed: false, remaining: 0 }
  }

  usage.count++
  return { allowed: true, remaining: FREE_LIMIT - usage.count }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { toolId, input, option } = body

    if (!toolId || !input) {
      return NextResponse.json(
        { error: 'Missing required fields: toolId, input' },
        { status: 400 }
      )
    }

    const tool = toolConfigs[toolId]
    if (!tool) {
      return NextResponse.json(
        { error: `Unknown tool: ${toolId}` },
        { status: 400 }
      )
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous'
    const apiKey = request.headers.get('x-api-key')
    
    // Skip rate limit for API key users (paid)
    if (!apiKey) {
      const { allowed, remaining } = checkRateLimit(ip)
      if (!allowed) {
        return NextResponse.json(
          { 
            error: 'Daily free limit reached. Upgrade to Pro for unlimited access.',
            upgradeUrl: '/api/checkout?plan=pro',
            remaining: 0,
          },
          { status: 429 }
        )
      }
    }

    // Build prompt with option context
    let userPrompt = input
    if (option && tool.options) {
      const selectedOption = tool.options.find(o => o.value === option)
      if (selectedOption) {
        userPrompt = `[${tool.optionLabel}: ${selectedOption.label}]\n\n${input}`
      }
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: tool.systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content || 'No output generated.'

    return NextResponse.json({
      result,
      toolId,
      model: 'gpt-4o-mini',
      tokens: completion.usage?.total_tokens || 0,
    })
  } catch (error: unknown) {
    console.error('AI generation error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}
