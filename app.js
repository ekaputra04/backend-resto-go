const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Membuat konfigurasi untuk menyimpan kunci API yang valid
const validAPIKeys = new Set(process.env.VALID_API_KEYS.split(","));

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DB_URI, {});
    console.log("Berhasil connect ke database!");
  } catch (error) {
    console.error("Gagal connect ke database:", error);
    process.exit(1);
  }
}

connectToDatabase();

// Middleware untuk memeriksa kunci API
function checkAPIKey(req, res, next) {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey || !validAPIKeys.has(apiKey)) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  next();
}

// Menggunakan middleware untuk memeriksa kunci API untuk semua rute
app.use("/users", checkAPIKey);
app.use("/menu-categories", checkAPIKey);
app.use("/extra-menus", checkAPIKey);
app.use("/coupons", checkAPIKey);

// Mengimpor router dari file routes
const usersRouter = require("./routes/users");
const menuCategoriesRouter = require("./routes/menuCategories");
const extraMenusRouter = require("./routes/extraMenus");
const couponsRouter = require("./routes/coupons");

// Menggunakan router untuk rute
app.use("/users", usersRouter);
app.use("/menu-categories", menuCategoriesRouter);
app.use("/extra-menus", extraMenusRouter);
app.use("/coupons", couponsRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Aplikasi Berjalan Di Port ${PORT}!`);
});

app.get("/", (req, res) => {
  res.send("Server is Running");
});
