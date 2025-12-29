const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const User = require("../models/User");
const Address = require("../models/Address");

const { allowedPincodes } = require("../config/serviceArea");

// ================= ADMIN: Get all orders =================
router.get("/all", protect, allowRoles("admin"), async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("assignedDeliveryAgent", "name email phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ================= PLACE ORDER (customer) =================
router.post("/place", protect, allowRoles("customer"), async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { addressId } = req.body;
    const userId = req.user.id;

    // 1️⃣ Load cart
    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 2️⃣ Load address
    const address = await Address.findById(addressId).session(session);
    if (!address) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Invalid address" });
    }

    // 🚫 LOCATION RESTRICTION (ISSUE 3 FIX)
    if (!allowedPincodes.includes(address.pincode)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({
        message: "Sorry, we do not deliver to this area yet"
      });
    }

    // 3️⃣ Build order items + stock check
    const orderItems = [];
    for (const ci of cart.items) {
      const prod = await Product.findById(ci.product._id).session(session);

      if (!prod || !prod.approved) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({ message: `${prod?.name} not available` });
      }

      if (prod.stock < ci.quantity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({ message: `Insufficient stock for ${prod.name}` });
      }

      prod.stock -= ci.quantity;
      await prod.save({ session });

      orderItems.push({
        product: prod._id,
        vendor: prod.vendor,
        name: prod.name,
        price: prod.price,
        quantity: ci.quantity
      });
    }

    // 4️⃣ Create order
    const totalAmount = cart.items.reduce(
      (t, it) => t + it.quantity * it.priceAtPurchase,
      0
    );

    const order = await Order.create(
      [
        {
          user: userId,
          items: orderItems,
          address: {
            street: address.street,
            city: address.city,
            pincode: address.pincode,
            phone: address.phone,
            label: address.label
          },
          totalAmount,
          paymentStatus: "pending",
          orderStatus: "pending"
        }
      ],
      { session }
    );

    // 5️⃣ Clear cart
    cart.items = [];
    cart.totalAmount = 0;
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ message: "Order placed", order: order[0] });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: err.message });
  }
});

// ================= CUSTOMER ORDERS =================
router.get("/my-orders", protect, allowRoles("customer"), async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// ================= VENDOR ORDERS =================
router.get("/vendor", protect, allowRoles("vendor"), async (req, res) => {
  const orders = await Order.find({ "items.vendor": req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

// ================= ADMIN: Assign delivery =================
router.put("/assign-delivery/:orderId", protect, allowRoles("admin"), async (req, res) => {
  try {
    const { deliveryAgentId } = req.body;

    const agent = await User.findById(deliveryAgentId);
    if (!agent || agent.role !== "delivery") {
      return res.status(400).json({ message: "Invalid delivery agent" });
    }

    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.assignedDeliveryAgent = agent._id;
    order.deliveryOtp = Math.floor(1000 + Math.random() * 9000).toString();
    order.orderStatus = "confirmed";

    await order.save();

    res.json({ message: "Delivery assigned", order });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELIVERY: Update status =================
router.put("/delivery/update-status/:orderId", protect, allowRoles("delivery"), async (req, res) => {
  try {
    const { status, otp } = req.body;
    const order = await Order.findById(req.params.orderId);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!order.assignedDeliveryAgent || order.assignedDeliveryAgent.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not your order" });
    }

    if (status === "delivered") {
      if (!otp || otp !== order.deliveryOtp) {
        return res.status(400).json({ message: "Invalid delivery OTP" });
      }
      order.orderStatus = "delivered";
      order.paymentStatus = "paid";
    } else {
      order.orderStatus = status;
    }

    await order.save();
    res.json({ message: "Status updated", order });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= DELIVERY: My orders =================
router.get("/delivery/my-orders", protect, allowRoles("delivery"), async (req, res) => {
  const orders = await Order.find({ assignedDeliveryAgent: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;
