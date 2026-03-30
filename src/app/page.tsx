"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          WriteAI
        </h1>
        <div className="flex gap-4">
          {session ? (
            <Link href="/dashboard" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/signin" className="px-4 py-2 rounded-lg hover:bg-white/10 transition">
                Sign In
              </Link>
              <Link href="/auth/signup" className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          AI-Powered Writing Tools
          <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            That Actually Ship
          </span>
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Generate blog outlines, content structures, and SEO-optimized writing plans in seconds.
          Powered by Claude AI.
        </p>
        <Link
          href="/auth/signup"
          className="inline-block px-8 py-4 bg-purple-600 text-lg font-semibold rounded-xl hover:bg-purple-500 transition shadow-lg shadow-purple-600/30"
        >
          Start Free — 3 Generations/Day
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {[
          { title: "Blog Post Outliner", desc: "Input a topic + keywords, get a structured outline with headings, key points, and word count targets.", icon: "📝" },
          { title: "SEO Optimized", desc: "Every outline includes SEO suggestions and keyword placement guidance built in.", icon: "🔍" },
          { title: "Instant Results", desc: "Claude AI generates professional-quality outlines in under 10 seconds.", icon: "⚡" },
        ].map((f) => (
          <div key={f.title} className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
            <div className="text-3xl mb-3">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <p className="text-4xl font-bold mb-4">$0<span className="text-lg text-gray-400">/mo</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>3 generations per day</li>
              <li>Blog Post Outliner</li>
              <li>Basic SEO suggestions</li>
            </ul>
            <Link href="/auth/signup" className="block text-center px-6 py-3 border border-purple-500 rounded-xl hover:bg-purple-500/20 transition">
              Get Started
            </Link>
          </div>
          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 relative">
            <div className="absolute -top-3 right-6 bg-purple-600 text-sm px-3 py-1 rounded-full">Popular</div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <p className="text-4xl font-bold mb-4">$19<span className="text-lg text-gray-400">/mo</span></p>
            <ul className="space-y-3 text-gray-300 mb-8">
              <li>Unlimited generations</li>
              <li>All writing tools</li>
              <li>Advanced SEO analysis</li>
              <li>Priority support</li>
            </ul>
            <Link href="/auth/signup" className="block text-center px-6 py-3 bg-purple-600 rounded-xl hover:bg-purple-500 transition">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 border-t border-white/5">
        <p>&copy; 2026 WriteAI. Powered by Claude AI.</p>
      </footer>
    </div>
  );
}
