"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface OutlineSection {
  heading: string;
  keyPoints: string[];
  targetWordCount: number;
}

interface Outline {
  title: string;
  estimatedWordCount: number;
  sections: OutlineSection[];
  seoSuggestions: string[];
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [outline, setOutline] = useState<Outline | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState<{ used: number; limit: number | null } | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin");
  }, [status, router]);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutline(null);

    const res = await fetch("/api/generate/outline", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, keywords }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Generation failed");
      setLoading(false);
      return;
    }

    setOutline(data.outline);
    setUsage(data.usage);
    setLoading(false);
  }

  async function handleUpgrade() {
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  if (status === "loading") {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto border-b border-white/10">
        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          WriteAI
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{session.user?.email}</span>
          <button onClick={handleUpgrade} className="text-sm px-3 py-1 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/40 transition">
            Upgrade to Pro
          </button>
          <button onClick={() => signOut()} className="text-sm text-gray-400 hover:text-white transition">
            Sign Out
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-2">Blog Post Outliner</h1>
        <p className="text-gray-400 mb-8">Enter a topic and optional keywords to generate a structured blog outline.</p>

        {usage && (
          <div className="mb-6 text-sm text-gray-400">
            {usage.limit ? `${usage.used}/${usage.limit} generations used today` : "Unlimited generations (Pro)"}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4 mb-10">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Topic *</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., How to start a SaaS business in 2026"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Keywords (optional, comma-separated)</label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="e.g., SaaS, startup, revenue, MVP"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-purple-600 rounded-xl font-semibold hover:bg-purple-500 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Outline"}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400">{error}</p>
            {error.includes("Upgrade") && (
              <button onClick={handleUpgrade} className="mt-2 text-sm text-purple-400 hover:underline">
                Upgrade to Pro
              </button>
            )}
          </div>
        )}

        {outline && typeof outline === "object" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">{outline.title}</h2>
            <p className="text-gray-400 text-sm mb-6">Estimated word count: {outline.estimatedWordCount}</p>

            <div className="space-y-6">
              {outline.sections?.map((section, i) => (
                <div key={i} className="border-l-2 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold mb-1">{section.heading}</h3>
                  <p className="text-xs text-gray-500 mb-2">~{section.targetWordCount} words</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-1">
                    {section.keyPoints?.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {outline.seoSuggestions && outline.seoSuggestions.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-3">SEO Suggestions</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  {outline.seoSuggestions.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
