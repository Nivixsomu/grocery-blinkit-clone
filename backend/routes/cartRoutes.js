const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");
const Product = require("../models/Product");

const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// ADD ITEM TO CART
router.post("/add", protect, allowRoles("customer"), async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product || !product.approved) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: req.user.id });

    // create new cart if none exists
    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        items: [],
        totalAmount: 0
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex >= 0) {
      // increase quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // add new product to cart
      cart.items.push({
        product: productId,
        quantity,
        priceAtPurchase: product.price
      });
    }

    // update total
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.priceAtPurchase,
      0
    );

    await cart.save();

    res.json({
      message: "Item added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER CART
router.get("/", protect, allowRoles("customer"), async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    res.json(cart || { items: [], totalAmount: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// REMOVE or DECREASE ITEM FROM CART
router.post("/remove", protect, allowRoles("customer"), async (req, res) => {
  try {
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    // decrease quantity
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } 
    else {
      // remove item if quantity = 1
      cart.items.splice(itemIndex, 1);
    }

    // update total amount
    cart.totalAmount = cart.items.reduce(
      (total, item) => total + item.quantity * item.priceAtPurchase,
      0
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    res.json(updatedCart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
