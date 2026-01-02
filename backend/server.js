// server.js

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();


const app = express();

// Middleware
app.use(express.json());      // To parse JSON bodies
// app.use(cors());              // Enable CORS
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://grocery-blinkit-clone.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(helmet());            // Security headers

// stripe REGISTER ROUTE
app.use("/api/stripe", require("./routes/stripeRoutes"));


//ERROR HANDLE
app.use(require("./middleware/errorHandler"));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

//admin 
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);

//product
const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

//PUBLIC PRODUCT ROUTES
const publicProductRoutes = require("./routes/publicProductRoutes");
app.use("/api/products/public", publicProductRoutes);

// Cart Routes
const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// Address Routes
const addressRoutes = require("./routes/addressRoutes");
app.use("/api/address", addressRoutes);

// ORDER ROUTES
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

//vendorRoutes
const vendorRoutes = require("./routes/vendorRoutes");
app.use("/api/vendor", vendorRoutes);



// Simple test route
app.get("/", (req, res) => {
  res.send("Grocery Backend API is running...");
});

// Connect to MongoDB and start server
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
