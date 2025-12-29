const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// ==============================
// GET ALL VENDORS (Admin Only)
// ==============================
router.get("/vendors", protect, allowRoles("admin"), async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" }).sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// APPROVE A VENDOR
// ==============================
router.put("/vendor/approve/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const vendor = await User.findById(req.params.id);

    if (!vendor) return res.status(404).json({ message: "Vendor not found" });

    vendor.approved = true;
    await vendor.save();

    res.json({ message: "Vendor approved", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// DELETE / REJECT VENDOR
// ==============================
router.delete("/vendor/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const vendor = await User.findByIdAndDelete(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.json({ message: "Vendor removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// GET ALL PRODUCTS (Admin sees all vendor products)
// ==============================
router.get("/products", protect, allowRoles("admin"), async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// APPROVE PRODUCT
// ==============================
router.put("/product/approve/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    product.approved = true;
    await product.save();

    res.json({ message: "Product approved", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// DELETE PRODUCT
// ==============================
router.delete("/product/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// GET ALL CUSTOMERS
// ==============================
router.get("/customers", protect, allowRoles("admin"), async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==============================
// BLOCK / UNBLOCK CUSTOMER
// ==============================
router.put("/customer/block/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    customer.blocked = !customer.blocked; // toggle block/unblock
    await customer.save();

    res.json({
      message: customer.blocked ? "Customer blocked" : "Customer unblocked",
      customer
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==============================
// DELETE CUSTOMER
// ==============================
router.delete("/customer/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const customer = await User.findByIdAndDelete(req.params.id);

    if (!customer) return res.status(404).json({ message: "Customer not found" });

    res.json({ message: "Customer deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delivery agents
router.get("/delivery-agents", protect, allowRoles("admin"), async (req, res) => {
  try {
    const agents = await User.find({ role: "delivery" }).sort({ createdAt: -1 });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Add new delivery agent
router.post("/delivery-agents", protect, allowRoles("admin"), async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const bcrypt = require("bcryptjs");

const hashedPassword = await bcrypt.hash(password, 10);

const agent = await User.create({
  name,
  email,
  phone,
  password: hashedPassword,
  role: "delivery",
  approved: true
});


    res.json({ message: "Delivery agent added", agent });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Block / Unblock delivery agent
router.put("/delivery-agents/block/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const agent = await User.findById(req.params.id);

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    agent.blocked = !agent.blocked; // toggle
    await agent.save();

    res.json({ message: agent.blocked ? "Agent blocked" : "Agent unblocked", agent });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete delivery agent
router.delete("/delivery-agents/:id", protect, allowRoles("admin"), async (req, res) => {
  try {
    const agent = await User.findByIdAndDelete(req.params.id);

    if (!agent) return res.status(404).json({ message: "Agent not found" });

    res.json({ message: "Delivery agent removed" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = router;
