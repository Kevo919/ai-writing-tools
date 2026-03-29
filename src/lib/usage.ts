import { prisma } from "./prisma";

const FREE_TIER_LIMIT = 5;

export async function checkUsageLimit(userId: string, tool: string): Promise<{ allowed: boolean; used: number; limit: number | null }> {
  const today = new Date().toISOString().split("T")[0];

  const subscription = await prisma.subscription.findUnique({
    where: { userId },
  });

  const isPaid = subscription?.status === "active";

  if (isPaid) {
    return { allowed: true, used: 0, limit: null };
  }

  const usage = await prisma.usage.findUnique({
    where: { userId_tool_date: { userId, tool, date: today } },
  });

  const used = usage?.count ?? 0;
  return { allowed: used < FREE_TIER_LIMIT, used, limit: FREE_TIER_LIMIT };
}

export async function incrementUsage(userId: string, tool: string): Promise<void> {
  const today = new Date().toISOString().split("T")[0];

  await prisma.usage.upsert({
    where: { userId_tool_date: { userId, tool, date: today } },
    update: { count: { increment: 1 } },
    create: { userId, tool, date: today, count: 1 },
  });
}
