const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"]
    },
    category: {
      type: String,
      required: true,
       enum: {
        values: ["Pizza", "Burger", "Salad", "Beverage", "Dessert"],
        message: "Invalid category"
      }
    },
    ingredients: {
      type: [String],
      default: []
    },
    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);