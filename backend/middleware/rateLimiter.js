const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per IP
  message: {
    message: "Too many attempts. Try again after 15 minutes."
  }
});

module.exports = authLimiter;
