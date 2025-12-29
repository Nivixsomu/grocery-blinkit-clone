const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const authLimiter = require("../middleware/rateLimiter");
const { body } = require("express-validator");
const validate = require("../middleware/validate");

// Public Routes (SECURED)
router.post(
  "/register",
  authLimiter,
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 })
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  authLimiter,
  [
    body("email").isEmail(),
    body("password").notEmpty()
  ],
  validate,
  loginUser
);

// Protected Route (Test)
router.get(
  "/profile",
  protect,
  allowRoles("customer", "vendor", "admin", "delivery"),
  (req, res) => {
    res.json({
      message: "Profile accessed",
      user: req.user
    });
  }
);

module.exports = router;
