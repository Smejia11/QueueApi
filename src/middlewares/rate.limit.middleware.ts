import rateLimit from 'express-rate-limit';
import config from '../config/';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.maxRateLimit, // Limit each IP to 50 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: (req) => {
    if (!req.ip) {
      console.error(
        'WARN | `express-rate-limit` | `request.ip` is undefined. You can avoid this by providing a custom `keyGenerator` function, but it may be indicative of a larger issue.'
      );
    }

    return req?.ip?.replace(/:\d+[^:]*$/, '') || '';
  },
});
