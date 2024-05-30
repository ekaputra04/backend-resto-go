const mongoose = require("mongoose");
const MenuCategories = require("./menuCategories");

const menusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photo_url: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MenuCategories,
      required: true,
    },
  },
  {
    collection: "menus",
  }
);

module.exports = mongoose.model("Menus", menusSchema);
