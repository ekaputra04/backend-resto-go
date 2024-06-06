const express = require("express");

const router = express.Router();
const {
  getAllMenus,
  getMenu,
  addMenus,
  editMenu,
  deleteMenu,
  getMenuFromName,
} = require("../controllers/menus");

router.get("/", getAllMenus);
router.get("/:id", getMenu);
router.get("/name/:name", getMenuFromName);
router.post("/", addMenus);
router.put("/:id", editMenu);
router.delete("/:id", deleteMenu);

module.exports = router;
