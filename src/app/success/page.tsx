import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-2">Welcome to Pro!</h1>
        <p className="text-gray-600 mb-6">
          Your SmartAI Pro subscription is now active. Enjoy unlimited AI generations across all tools.
        </p>
        <div className="space-y-3">
          <Link href="/tools/writer" className="block btn-primary w-full text-center">
            Start Creating →
          </Link>
          <Link href="/" className="block text-indigo-600 font-medium hover:text-indigo-700">
            ← Back to Home
          </Link>
        </div>
        <div className="mt-8 bg-green-50 rounded-xl p-4">
          <p className="text-green-700 text-sm font-medium">✓ Unlimited AI generations</p>
          <p className="text-green-700 text-sm font-medium">✓ All premium tools unlocked</p>
          <p className="text-green-700 text-sm font-medium">✓ Priority processing</p>
          <p className="text-green-700 text-sm font-medium">✓ API access included</p>
        </div>
      </div>
    </main>
  )
}
