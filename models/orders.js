const mongoose = require("mongoose");
const Users = require("./users");
const Menus = require("./menus");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Users,
    required: true,
  },
  coupon: {
    couponCode: {
      type: String,
      default: null,
      required: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  isInCart: {
    type: Boolean,
    default: true,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
    required: true,
  },
  details: [
    {
      menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Menus,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Orders", orderSchema);
