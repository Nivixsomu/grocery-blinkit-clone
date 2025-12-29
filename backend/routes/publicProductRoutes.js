const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// GET ALL APPROVED PRODUCTS
router.get("/all", async (req, res) => {
  try {
    const products = await Product.find({ approved: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET PRODUCTS BY CATEGORY
router.get("/category/:categoryName", async (req, res) => {
  try {
    const category = req.params.categoryName;
    const products = await Product.find({ category, approved: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH PRODUCTS
router.get("/search/:keyword", async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
      approved: true
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
