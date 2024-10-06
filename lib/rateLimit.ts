import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './upstash';
import { MODEL_CONFIG, type ModelId } from '@/config/models';

// Create a rate limiter for each model
const rateLimiters: Record<ModelId, Ratelimit> = Object.fromEntries(
  Object.entries(MODEL_CONFIG).map(([modelId, config]) => [
    modelId,
    new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(config.userRateLimit, '24 h'),
      analytics: true,
      prefix: `ratelimit:${modelId}:`,
    }),
  ]),
) as Record<ModelId, Ratelimit>;

// Create global rate limiters for each model
const globalRateLimiters: Record<ModelId, Ratelimit> = Object.fromEntries(
  Object.entries(MODEL_CONFIG).map(([modelId, config]) => [
    modelId,
    new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(config.globalRateLimit, '24 h'),
      analytics: true,
      prefix: `ratelimit:global:${modelId}:`,
    }),
  ]),
) as Record<ModelId, Ratelimit>;

export const rateLimit = async (identifier: string, model: ModelId) => {
  const modelConfig = MODEL_CONFIG[model];

  // If the model has no rate limit (userRateLimit is 0), return success immediately
  if (modelConfig.userRateLimit === 0 && modelConfig.globalRateLimit === 0) {
    return {
      success: true,
      limit: 0,
      remaining: 0,
      reset: 0,
      globalLimit: 0,
      globalRemaining: 0,
      globalReset: 0,
    };
  }

  const modelLimiter = rateLimiters[model];
  const globalLimiter = globalRateLimiters[model];

  if (!modelLimiter || !globalLimiter) {
    throw new Error(`Invalid model: ${model}`);
  }

  const [userResult, globalResult] = await Promise.all([
    modelLimiter.limit(identifier),
    globalLimiter.limit('global'),
  ]);

  return {
    success: userResult.success && globalResult.success,
    limit: userResult.limit,
    remaining: userResult.remaining,
    reset: userResult.reset,
    globalLimit: globalResult.limit,
    globalRemaining: globalResult.remaining,
    globalReset: globalResult.reset,
  };
};
