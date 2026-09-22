import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * Raw hit counter, not de-duped per visitor — every GET bumps it. That is the
 * classic webring-counter joke the footer is making ("you are the Nth
 * visitor"), and de-duping would need a cookie check that this endpoint
 * doesn't have a reason to carry otherwise.
 *
 * Requires UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN — added
 * automatically to the Vercel project's env vars once a Redis store is
 * connected via Vercel Marketplace (Storage -> Marketplace -> Upstash).
 * `vercel env pull` brings them into .env.local for local dev.
 */
export async function GET() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return NextResponse.json(
      { error: "Redis not configured" },
      { status: 503 },
    );
  }

  const redis = Redis.fromEnv();
  const count = await redis.incr("visits");

  return NextResponse.json({ count });
}
