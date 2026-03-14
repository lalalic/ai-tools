import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SmartAI Tools — AI-Powered Productivity Tools',
  description: 'Professional AI tools for writing, coding, translation, and more. Save hours of work with instant AI-powered results. Try free, upgrade for unlimited.',
  keywords: 'AI tools, AI writing, AI translation, AI code, productivity, ChatGPT alternative',
  openGraph: {
    title: 'SmartAI Tools — AI-Powered Productivity Tools',
    description: 'Professional AI tools for writing, coding, translation, and more.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
