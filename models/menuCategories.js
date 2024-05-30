const mongoose = require("mongoose");

const menuCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "menuCategories", // Nama koleksi yang diinginkan
  }
);

module.exports = mongoose.model("MenuCategories", menuCategoriesSchema);
