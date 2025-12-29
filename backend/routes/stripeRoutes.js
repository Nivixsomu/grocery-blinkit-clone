const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const { createCheckoutSession } = require("../controllers/stripeController");

router.post(
  "/create-session",
  protect,
  allowRoles("customer"),
  createCheckoutSession
);

module.exports = router;
