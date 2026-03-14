import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-12-18.acacia' as Stripe.LatestApiVersion,
  })
}

const PLANS: Record<string, { name: string; price: number; interval: 'month' | 'year' }> = {
  pro: { name: 'SmartAI Pro', price: 999, interval: 'month' }, // $9.99
  team: { name: 'SmartAI Team', price: 2999, interval: 'month' }, // $29.99
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const plan = searchParams.get('plan') || 'pro'
    const planConfig = PLANS[plan]
    
    if (!planConfig) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const stripe = getStripe()
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: planConfig.name,
              description: `${planConfig.name} — Unlimited AI generations, all premium tools`,
            },
            unit_amount: planConfig.price,
            recurring: { interval: planConfig.interval },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/#pricing`,
      metadata: { plan },
    })

    return NextResponse.redirect(session.url!, 303)
  } catch (error: unknown) {
    console.error('Stripe checkout error:', error)
    const message = error instanceof Error ? error.message : 'Failed to create checkout session'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
