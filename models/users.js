const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    telephone: {
      type: String,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users", // Nama koleksi yang diinginkan
  }
);

module.exports = mongoose.model("Users", usersSchema);
