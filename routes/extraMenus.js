const express = require("express");
const router = express.Router();
const {
  getAllExtraMenus,
  getExtraMenu,
  getExtraMenuFromName,
  addExtraMenus,
  editExtraMenu,
  deleteExtraMenu,
} = require("../controllers/extraMenus");

router.get("/", getAllExtraMenus);
router.get("/:id", getExtraMenu);
router.get("/name/:name", getExtraMenuFromName);
router.post("/", addExtraMenus);
router.put("/:id", editExtraMenu);
router.delete("/:id", deleteExtraMenu);

module.exports = router;
