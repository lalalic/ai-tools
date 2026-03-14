'use client'

import { useState } from 'react'
import Link from 'next/link'

const tools = [
  {
    id: 'writer',
    name: 'AI Writer',
    description: 'Generate blog posts, articles, and marketing copy in seconds.',
    icon: '✍️',
    category: 'Writing',
    href: '/tools/writer',
    popular: true,
  },
  {
    id: 'email',
    name: 'Email Generator',
    description: 'Professional emails — cold outreach, follow-ups, replies.',
    icon: '📧',
    category: 'Writing',
    href: '/tools/email',
    popular: true,
  },
  {
    id: 'translator',
    name: 'AI Translator',
    description: 'Natural translation between 50+ languages. Not robotic.',
    icon: '🌐',
    category: 'Language',
    href: '/tools/translator',
    popular: true,
  },
  {
    id: 'code',
    name: 'Code Generator',
    description: 'Generate, explain, and debug code. Any language.',
    icon: '💻',
    category: 'Development',
    href: '/tools/code',
    popular: false,
  },
  {
    id: 'summarizer',
    name: 'Text Summarizer',
    description: 'Condense long documents into key points instantly.',
    icon: '📋',
    category: 'Productivity',
    href: '/tools/summarizer',
    popular: true,
  },
  {
    id: 'social',
    name: 'Social Media Posts',
    description: 'Engaging posts for Twitter, LinkedIn, Instagram, TikTok.',
    icon: '📱',
    category: 'Marketing',
    href: '/tools/social',
    popular: false,
  },
  {
    id: 'resume',
    name: 'Resume Builder',
    description: 'Transform your experience into powerful resume bullets.',
    icon: '📄',
    category: 'Career',
    href: '/tools/resume',
    popular: true,
  },
  {
    id: 'seo',
    name: 'SEO Optimizer',
    description: 'Meta descriptions, titles, and keyword-rich content.',
    icon: '🔍',
    category: 'Marketing',
    href: '/tools/seo',
    popular: false,
  },
]

const pricing = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    features: ['5 AI generations per day', 'All tools available', 'Standard quality'],
    cta: 'Get Started Free',
    href: '/tools/writer',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: '/month',
    features: ['Unlimited AI generations', 'All tools unlocked', 'Premium quality (GPT-4)', 'Priority processing', 'No ads', 'API access'],
    cta: 'Start Pro Trial',
    href: '/api/checkout?plan=pro',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$29.99',
    period: '/month',
    features: ['Everything in Pro', 'Up to 10 team members', 'Shared templates', 'Admin dashboard', 'Priority support', 'Custom branding'],
    cta: 'Contact Sales',
    href: '/api/checkout?plan=team',
    highlighted: false,
  },
]

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))]
  const filteredTools = activeCategory === 'All' ? tools : tools.filter(t => t.category === activeCategory)

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-xl font-bold gradient-text">SmartAI Tools</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#tools" className="text-gray-600 hover:text-gray-900">Tools</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <Link href="/tools/writer" className="btn-primary text-sm">Try Free →</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            🚀 Powered by GPT-4 & Claude
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            AI Tools That <span className="gradient-text">Actually Work</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            8 professional AI tools for writing, coding, translation, and more.
            Stop switching between apps — get everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/writer" className="btn-primary text-lg px-8 py-4">
              Start Creating Free →
            </Link>
            <a href="#pricing" className="btn-secondary text-lg px-8 py-4">
              View Pricing
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">No credit card required • 5 free uses per day</p>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600">10K+</div>
              <div className="text-gray-600">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">500K+</div>
              <div className="text-gray-600">AI Generations</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">4.9/5</div>
              <div className="text-gray-600">User Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-indigo-600">50+</div>
              <div className="text-gray-600">Languages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">All-in-One AI Toolkit</h2>
            <p className="text-xl text-gray-600">Every tool you need, powered by the latest AI models.</p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tool Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTools.map(tool => (
              <Link key={tool.id} href={tool.href} className="tool-card group">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{tool.icon}</span>
                  {tool.popular && (
                    <span className="bg-amber-100 text-amber-700 text-xs font-medium px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
                <div className="mt-4 text-indigo-600 text-sm font-medium">
                  Try it free →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">1</div>
              <h3 className="text-xl font-bold mb-2">Choose Your Tool</h3>
              <p className="text-gray-600">Pick from 8 AI-powered tools — writing, coding, translation, and more.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">2</div>
              <h3 className="text-xl font-bold mb-2">Describe What You Need</h3>
              <p className="text-gray-600">Enter your prompt, topic, or paste your text. Be as specific as you want.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-indigo-600">3</div>
              <h3 className="text-xl font-bold mb-2">Get AI Results</h3>
              <p className="text-gray-600">Instant, high-quality results. Copy, edit, and use anywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Start free. Upgrade when you need more.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-indigo-600 text-white shadow-2xl scale-105 relative'
                    : 'bg-white border border-gray-200 shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? '' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className={`${plan.highlighted ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={plan.highlighted ? 'text-indigo-200' : 'text-green-500'}>✓</span>
                      <span className={`text-sm ${plan.highlighted ? 'text-indigo-100' : 'text-gray-600'}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  className={`block text-center py-3 px-6 rounded-xl font-semibold transition-colors ${
                    plan.highlighted
                      ? 'bg-white text-indigo-600 hover:bg-indigo-50'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: 'What AI models do you use?', a: 'We use GPT-4, GPT-4o-mini, and Claude for the best quality results. Pro subscribers get access to the most powerful models.' },
              { q: 'Is there a free plan?', a: 'Yes! You get 5 free AI generations per day across all tools. No credit card required.' },
              { q: 'Can I cancel anytime?', a: 'Absolutely. Cancel your subscription anytime with one click. No contracts, no hidden fees.' },
              { q: 'What languages are supported?', a: 'Our AI Translator supports 50+ languages. Other tools work best in English but handle many languages.' },
              { q: 'Is my data secure?', a: 'Yes. We don\'t store your inputs or outputs. Everything is processed in real-time and discarded.' },
              { q: 'Do you offer an API?', a: 'Pro and Team subscribers get API access. Contact us for documentation and rate limits.' },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer">
                <summary className="font-semibold text-gray-900">{q}</summary>
                <p className="mt-3 text-gray-600">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center gradient-bg rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to 10x Your Productivity?</h2>
          <p className="text-xl text-indigo-100 mb-8">Join thousands who save hours every day with AI-powered tools.</p>
          <Link href="/tools/writer" className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-colors">
            Start Creating Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-gray-400 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">⚡</span>
                <span className="text-lg font-bold text-white">SmartAI Tools</span>
              </div>
              <p className="text-sm">AI-powered productivity tools for professionals.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/writer" className="hover:text-white">AI Writer</Link></li>
                <li><Link href="/tools/email" className="hover:text-white">Email Generator</Link></li>
                <li><Link href="/tools/translator" className="hover:text-white">AI Translator</Link></li>
                <li><Link href="/tools/code" className="hover:text-white">Code Generator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">More Tools</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/tools/summarizer" className="hover:text-white">Text Summarizer</Link></li>
                <li><Link href="/tools/social" className="hover:text-white">Social Posts</Link></li>
                <li><Link href="/tools/resume" className="hover:text-white">Resume Builder</Link></li>
                <li><Link href="/tools/seo" className="hover:text-white">SEO Optimizer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><a href="mailto:support@smartai.tools" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            © 2026 SmartAI Tools. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
