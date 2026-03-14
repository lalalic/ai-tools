'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { toolConfigs } from '@/lib/tools'
import { notFound } from 'next/navigation'

interface ToolPageProps {
  params: { tool: string }
}

export default function ToolPage({ params }: ToolPageProps) {
  const config = toolConfigs[params.tool]
  if (!config) notFound()

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedOption, setSelectedOption] = useState(config.options?.[0]?.value || '')
  const [copied, setCopied] = useState(false)
  const outputRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')
    setOutput('')

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: config.id,
          input: input.trim(),
          option: selectedOption,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 429) {
          setError(data.error || 'Rate limit reached. Upgrade to Pro for unlimited access.')
        } else {
          setError(data.error || 'Something went wrong. Please try again.')
        }
        return
      }

      setOutput(data.result)
      // Scroll to output
      setTimeout(() => {
        outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const otherTools = Object.values(toolConfigs).filter(t => t.id !== config.id).slice(0, 4)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span className="text-xl font-bold gradient-text">SmartAI Tools</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/#tools" className="text-gray-600 hover:text-gray-900 text-sm">All Tools</Link>
            <a href="/api/checkout?plan=pro" className="btn-primary text-sm py-2 px-4">
              Upgrade to Pro
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{config.icon}</span>
            <h1 className="text-3xl font-bold">{config.name}</h1>
          </div>
          <p className="text-gray-600 text-lg">{config.description}</p>
        </div>

        {/* Tool Interface */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">{config.inputLabel}</label>
              {config.options && (
                <select
                  value={selectedOption}
                  onChange={e => setSelectedOption(e.target.value)}
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {config.options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              )}
            </div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder={config.placeholder}
              className="w-full h-64 border border-gray-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
            />
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">{input.length} characters</span>
              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className={`btn-primary flex items-center gap-2 ${
                  loading || !input.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>Generate ✨</>
                )}
              </button>
            </div>
          </div>

          {/* Output Panel */}
          <div ref={outputRef} className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-700">{config.outputLabel}</label>
              {output && (
                <button
                  onClick={handleCopy}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              )}
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                <p className="text-red-700 text-sm">{error}</p>
                {error.includes('Upgrade') && (
                  <a href="/api/checkout?plan=pro" className="mt-2 inline-block text-sm text-indigo-600 font-semibold hover:text-indigo-700">
                    Upgrade to Pro →
                  </a>
                )}
              </div>
            )}

            {output ? (
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 bg-gray-50 rounded-xl p-4 h-64 overflow-y-auto">
                  {output}
                </div>
              </div>
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <span className="text-4xl block mb-2">{config.icon}</span>
                  <p>Your AI-generated result will appear here</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Usage Info */}
        <div className="mt-6 bg-indigo-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-indigo-600 font-semibold text-sm">💡 Free: 5 generations/day</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500 text-sm">Upgrade for unlimited access</span>
          </div>
          <a href="/api/checkout?plan=pro" className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">
            Go Pro — $9.99/mo →
          </a>
        </div>

        {/* Other Tools */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6">Try Other Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`} className="tool-card p-4">
                <span className="text-2xl">{tool.icon}</span>
                <h3 className="text-sm font-bold mt-2">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
