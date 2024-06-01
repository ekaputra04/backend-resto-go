const mongoose = require("mongoose");
const MenuCategories = require("./menuCategories");

const menusSchema = new mongoose.Schema(
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
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: MenuCategories,
      required: true,
    },
    url_image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "menus",
  }
);

module.exports = mongoose.model("Menus", menusSchema);
