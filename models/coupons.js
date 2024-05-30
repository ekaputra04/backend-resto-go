const mongoose = require("mongoose");

const couponsSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    dateStarted: {
      type: Date,
      required: true,
    },
    dateEnded: {
      type: Date,
      required: true,
    },
  },
  {
    collection: "coupons", // Nama koleksi yang diinginkan
  }
);

module.exports = mongoose.model("Coupons", couponsSchema);
