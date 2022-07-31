const rateLimit = require('express-rate-limit');
const { RateLimitHandler } = require('./error');
const { env, rateLimitRequest, rateLimitTime } = require('../config/env-vars');

module.exports = () => {
    let limiter = rateLimit({
        windowMs: 5 * 60 * 1000, // 5 minutes
        max: 3000, // limit each IP to 3000 requests per windowMs
        delayMs: 0,
        handler: RateLimitHandler,
    });
    if (env === 'production') {
        limiter = rateLimit({
            windowMs: rateLimitTime * 60 * 1000, // 15 minutes
            max: rateLimitRequest, // limit each IP to 30 requests per windowMs
            delayMs: 0,
            handler: RateLimitHandler,
        });
    }
    return limiter;
};
