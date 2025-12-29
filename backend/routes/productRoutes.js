const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");


// 1️⃣ ADD PRODUCT (Vendor)
router.post("/add", protect, allowRoles("vendor"), async (req, res) => {
  try {
    const { name, description, image, category, price, stock } = req.body;

    const newProduct = await Product.create({
      name,
      description,
      image,
      category,
      price,
      stock,
      vendor: req.user.id,
      approved: false
    });

    res.json({
      message: "Product submitted — waiting for admin approval",
      product: newProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 2️⃣ GET ALL PRODUCTS OF VENDOR
router.get("/vendor", protect, allowRoles("vendor"), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user.id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 3️⃣ EDIT PRODUCT (Vendor)
router.put("/:id", protect, allowRoles("vendor"), async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, vendor: req.user.id });
    
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();

    res.json({ message: "Product updated successfully", product });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 4️⃣ DELETE PRODUCT (Vendor)
router.delete("/:id", protect, allowRoles("vendor"), async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      vendor: req.user.id
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 5️⃣ ADMIN – APPROVE PRODUCT
router.put("/approve/:id", protect, allowRoles("admin"), async (req, res) => {
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


// 6️⃣ CUSTOMER – GET APPROVED PRODUCTS
router.get("/approved/all", async (req, res) => {
  try {
    const products = await Product.find({ approved: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADMIN: Get all products
router.get("/all", protect, allowRoles("admin"), async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;
