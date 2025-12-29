const express = require("express");
const router = express.Router();

const Address = require("../models/Address");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// ADD NEW ADDRESS
router.post("/add", protect, allowRoles("customer"), async (req, res) => {
  try {
    const { street, city, pincode, phone, label } = req.body;

    const newAddress = await Address.create({
      user: req.user.id,
      street,
      city,
      pincode,
      phone,
      label
    });

    res.json({ message: "Address added", address: newAddress });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET USER ADDRESSES
router.get("/", protect, allowRoles("customer"), async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
