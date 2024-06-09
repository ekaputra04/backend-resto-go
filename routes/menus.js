const express = require("express");

const router = express.Router();
const {
  getAllMenus,
  getMenu,
  getMenuFromName,
  getMenusFromCategories,
  addMenus,
  editMenu,
  deleteMenu,
} = require("../controllers/menus");

router.get("/", getAllMenus);
router.get("/:id", getMenu);
router.get("/name/:name", getMenuFromName);
router.get("/categories/:category", getMenusFromCategories);
router.post("/", addMenus);
router.put("/:id", editMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
