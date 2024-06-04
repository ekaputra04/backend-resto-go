const express = require("express");
const router = express.Router();
const {
  getAllMenuCategories,
  getMenuCategory,
  addMenuCategories,
  editMenuCategory,
  deleteMenuCategory,
  getMenuCategoryFromName,
} = require("../controllers/menuCategories");

router.get("/", getAllMenuCategories);
router.get("/:id", getMenuCategory);
router.get("/name/:name", getMenuCategoryFromName);
router.post("/", addMenuCategories);
router.put("/:id", editMenuCategory);
router.delete("/:id", deleteMenuCategory);

module.exports = router;
