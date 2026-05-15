const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  menuItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MenuItem",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, "Quantity must be at least 1"]
  },
  price: {
    type: Number,
    required: true
    }
});

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, "Valid customer name required"],
      minlength: [2, "Valid customer name required"]
    },
    customerPhone: {
      type: String,
      required: true
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "Order must contain at least one item"
      }
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "ready", "completed", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Order", orderSchema);