import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Anthropic from "@anthropic-ai/sdk";
import { authOptions } from "@/lib/auth";
import { checkUsageLimit, incrementUsage } from "@/lib/usage";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { topic, keywords } = await req.json();

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const usage = await checkUsageLimit(userId, "blog-outliner");
  if (!usage.allowed) {
    return NextResponse.json(
      { error: "Daily limit reached. Upgrade to Pro for unlimited generations.", used: usage.used, limit: usage.limit },
      { status: 429 }
    );
  }

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [
      {
        role: "user",
        content: `Create a detailed blog post outline for the topic: "${topic}"${keywords ? `. Include these keywords: ${keywords}` : ""}.

Return a structured outline in this exact JSON format:
{
  "title": "Suggested blog post title",
  "estimatedWordCount": 1500,
  "sections": [
    {
      "heading": "Section heading",
      "keyPoints": ["point 1", "point 2"],
      "targetWordCount": 300
    }
  ],
  "seoSuggestions": ["suggestion 1", "suggestion 2"]
}

Return ONLY valid JSON, no markdown fences or extra text.`,
      },
    ],
  });

  await incrementUsage(userId, "blog-outliner");

  const text = message.content[0].type === "text" ? message.content[0].text : "";

  try {
    const outline = JSON.parse(text);
    return NextResponse.json({ outline, usage: { used: usage.used + 1, limit: usage.limit } });
  } catch {
    return NextResponse.json({ outline: text, usage: { used: usage.used + 1, limit: usage.limit } });
  }
}
