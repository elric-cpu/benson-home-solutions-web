import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

type RateLimitResult = {
  success: boolean;
  limit: number;
  reset: number;
  remaining: number;
};

type RateLimiter = {
  limit(identifier: string): Promise<RateLimitResult>;
};

const FALLBACK_LIMIT = 3;
const FALLBACK_WINDOW_MS = 60_000;
const inMemoryWindows = new Map<string, number[]>();

const inMemoryRateLimiter: RateLimiter = {
  async limit(identifier: string) {
    const now = Date.now();
    const windowStart = now - FALLBACK_WINDOW_MS;
    const recentHits = (inMemoryWindows.get(identifier) || []).filter(hit => hit > windowStart);
    const success = recentHits.length < FALLBACK_LIMIT;

    if (success) {
      recentHits.push(now);
      inMemoryWindows.set(identifier, recentHits);
    }

    const oldestHit = recentHits[0] ?? now;
    return {
      success,
      limit: FALLBACK_LIMIT,
      remaining: Math.max(FALLBACK_LIMIT - recentHits.length, 0),
      reset: oldestHit + FALLBACK_WINDOW_MS,
    };
  },
};

function createRateLimiter(): RateLimiter {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    console.warn('[RateLimit] Upstash credentials are missing. Falling back to in-memory rate limiting.');
    return inMemoryRateLimiter;
  }

  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(FALLBACK_LIMIT, '60 s'),
    analytics: true,
    prefix: '@upstash/ratelimit',
  });
}

export const ratelimit = createRateLimiter();
