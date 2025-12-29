const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["customer", "vendor", "admin", "delivery"],
      default: "customer",
    },
    approved: {
  type: Boolean,
  default: false
},
blocked: {
  type: Boolean,
  default: false
},



    addresses: [
      {
        fullName: String,
        phone: String,
        pincode: String,
        houseNo: String,
        area: String,
        landmark: String,
        city: String,
        state: String,
      }
    ]
  },
  { timestamps: true }
);



module.exports = mongoose.model("User", userSchema);
