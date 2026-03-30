"use client";

import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          WriteAI
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/signin" className="px-4 py-2 rounded-lg hover:bg-white/10 transition">Sign In</Link>
          <Link href="/auth/signup" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition">Get Started</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 text-center mb-12">Start free, upgrade when you need more.</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-2">Free</h2>
            <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-400">/mo</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>3 generations per day</li>
              <li>Blog Post Outliner</li>
              <li>Basic SEO suggestions</li>
            </ul>
            <Link href="/auth/signup" className="block text-center px-6 py-3 border border-purple-500 rounded-xl hover:bg-purple-500/20 transition">
              Get Started Free
            </Link>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 relative">
            <div className="absolute -top-3 right-6 bg-purple-600 text-sm px-3 py-1 rounded-full">Popular</div>
            <h2 className="text-xl font-semibold mb-2">Pro</h2>
            <p className="text-4xl font-bold mb-4">$19<span className="text-lg text-gray-400">/mo</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>Unlimited generations</li>
              <li>All writing tools</li>
              <li>Advanced SEO analysis</li>
              <li>Priority support</li>
            </ul>
            <Link href="/auth/signup" className="block text-center px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition">
              Start Pro
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
