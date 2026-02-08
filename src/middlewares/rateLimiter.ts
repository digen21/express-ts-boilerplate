import rateLimit from "express-rate-limit";
import httpStatus from "http-status";

// General rate limiter for all routes
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later.",
    status: httpStatus.TOO_MANY_REQUESTS,
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Specific rate limiter for authentication endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for auth endpoints
  message: {
    success: false,
    message:
      "Too many authentication attempts from this IP, please try again later.",
    status: httpStatus.TOO_MANY_REQUESTS,
  },
  skipSuccessfulRequests: true, // Don't count successful requests towards the limit
});

// Specific rate limiter for sensitive endpoints like password reset
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per windowMs for sensitive endpoints
  message: {
    success: false,
    message:
      "Too many requests to sensitive endpoint from this IP, please try again later.",
    status: httpStatus.TOO_MANY_REQUESTS,
  },
});
