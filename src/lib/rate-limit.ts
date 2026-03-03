/**
 * Simple in-memory sliding window rate limiter.
 * Suitable for single-instance Vercel serverless — each cold start resets.
 * Upgrade to Vercel KV or Upstash Redis for multi-instance rate limiting.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}

interface RateLimitConfig {
  /** Maximum requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  windowSeconds: number;
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

/**
 * Check rate limit for a given identifier (usually IP address).
 * @param identifier - Unique ID for the requester (IP address)
 * @param config - Rate limit threshold and window
 * @returns Rate limit result with success status and remaining counts
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const entry = store.get(identifier);

  if (!entry || entry.resetAt < now) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return {
      success: true,
      limit: config.limit,
      remaining: config.limit - 1,
      resetAt: now + windowMs,
    };
  }

  if (entry.count >= config.limit) {
    return {
      success: false,
      limit: config.limit,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count++;
  return {
    success: true,
    limit: config.limit,
    remaining: config.limit - entry.count,
    resetAt: entry.resetAt,
  };
}

/** Default rate limit config for API routes: 10 requests per 60 seconds per IP */
export const API_RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  windowSeconds: 60,
};

/** Stricter rate limit for contact/form submissions: 3 per 5 minutes per IP */
export const FORM_RATE_LIMIT: RateLimitConfig = {
  limit: 3,
  windowSeconds: 300,
};

/** Chatbot rate limit: 10 requests per 2 minutes */
export const CHAT_RATE_LIMIT: RateLimitConfig = {
  limit: 10,
  windowSeconds: 120,
};
