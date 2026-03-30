// Centralized pricing/tier config — all values configurable via env vars
export const config = {
  freeTier: {
    dailyLimit: parseInt(process.env.FREE_TIER_DAILY_LIMIT ?? "3", 10),
    price: 0,
    label: "Free",
  },
  proTier: {
    dailyLimit: null as number | null, // unlimited
    priceMonthly: parseInt(process.env.PRO_TIER_PRICE_CENTS ?? "1900", 10) / 100,
    label: "Pro",
    stripePriceId: process.env.STRIPE_PRO_PRICE_ID ?? "",
  },
} as const;
