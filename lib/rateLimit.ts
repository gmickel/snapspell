import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './upstash';

// Update the ratelimiter to allow 20 requests per day
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(20, '24 h'),
  analytics: true,
});
