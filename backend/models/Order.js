const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [orderItemSchema],
  address: {
    street: String, city: String, pincode: String, phone: String, label: String
  },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending","paid","failed"], default: "pending" },
 orderStatus: {
  type: String,
  enum: [
    "pending",
    "confirmed",
    "picked",
    "out_for_delivery",
    "delivered",
    "cancelled"
  ],
  default: "pending"
}
,
  assignedDeliveryAgent: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  deliveryOtp: { type: String }, // optional OTP for delivery confirmation
  vendorNotified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
