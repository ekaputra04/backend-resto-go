const express = require("express");
const router = express.Router();
const {
  getAllExtraMenus,
  getExtraMenu,
  addExtraMenus,
  editExtraMenu,
  deleteExtraMenu,
} = require("../controllers/extraMenus");

router.get("/", getAllExtraMenus);
router.get("/:id", getExtraMenu);
router.post("/", addExtraMenus);
router.put("/:id", editExtraMenu);
router.delete("/:id", deleteExtraMenu);

module.exports = router;
