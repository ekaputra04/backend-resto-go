const mongoose = require("mongoose");

const extraMenusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "extraMenus", // Nama koleksi yang diinginkan
  }
);

module.exports = mongoose.model("ExtraMenus", extraMenusSchema);
