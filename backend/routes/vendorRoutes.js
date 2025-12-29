const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Order = require("../models/Order");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// VENDOR DASHBOARD STATS
router.get("/stats", protect, allowRoles("vendor"), async (req, res) => {
  try {
    const vendorId = req.user.id;

    const totalProducts = await Product.countDocuments({ vendor: vendorId });
    const approvedProducts = await Product.countDocuments({ vendor: vendorId, approved: true });
    const pendingProducts = await Product.countDocuments({ vendor: vendorId, approved: false });
    const outOfStock = await Product.countDocuments({ vendor: vendorId, stock: { $lte: 0 } });

    const vendorOrders = await Order.find({ "items.vendor": vendorId });

    const totalOrders = vendorOrders.length;

    // Calculate revenue from vendor-specific products
    let revenue = 0;
    vendorOrders.forEach(order => {
      order.items.forEach(item => {
        if (item.vendor.toString() === vendorId) {
          revenue += item.price * item.quantity;
        }
      });
    });

    res.json({
      totalProducts,
      approvedProducts,
      pendingProducts,
      outOfStock,
      totalOrders,
      revenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
