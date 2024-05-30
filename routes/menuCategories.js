const express = require("express");
const router = express.Router();
const {
  getAllMenuCategories,
  getMenuCategory,
  addMenuCategories,
  editMenuCategory,
  deleteMenuCategory,
} = require("../controllers/menuCategories");

router.get("/", getAllMenuCategories);
router.get("/:id", getMenuCategory);
router.post("/", addMenuCategories);
router.put("/:id", editMenuCategory);
router.delete("/:id", deleteMenuCategory);

module.exports = router;
