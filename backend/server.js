// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

/* =========================
   BASIC MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   CORS CONFIG (FIXED)
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://grocery-blinkit-clone.vercel.app",
];

// allow Vercel preview URLs
const isVercelPreview = (origin) =>
  origin && origin.endsWith(".vercel.app");

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman

      if (allowedOrigins.includes(origin) || isVercelPreview(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(helmet());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/products/public", require("./routes/publicProductRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/address", require("./routes/addressRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/vendor", require("./routes/vendorRoutes"));
app.use("/api/stripe", require("./routes/stripeRoutes"));

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Grocery Backend API is running...");
});

/* =========================
   ERROR HANDLER (LAST)
========================= */
app.use(require("./middleware/errorHandler"));

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err.message);
  });
