const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    _id: {
      type: String,
      default: null,
      required: true,
    },
    name: {
      type: String,
      default: null,
      required: true,
    },
    telephone: {
      type: String,
      default: null,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  coupon: {
    couponCode: {
      type: String,
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
        _id: {
          type: String,
          default: null,
          required: true,
        },
        name: {
          type: String,
          default: null,
          required: true,
        },
        price: {
          type: Number,
          default: 0,
          required: true,
        },
        category: {
          type: String,
          default: null,
          required: true,
        },
        url_image: {
          type: String,
          default: null,
          required: true,
        },
      },
      quantity: {
        type: Number,
        required: true,
      },
      extraMenu: {
        _id: {
          type: String,
          default: null,
          required: false,
        },
        name: {
          type: String,
          default: null,
          required: false,
        },
        price: {
          type: Number,
          default: 0,
          required: false,
        },
      },
      subTotalMenu: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Orders", orderSchema);
