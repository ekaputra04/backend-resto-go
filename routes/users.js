const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  addUsers,
  editUser,
  deleteUser,
  getUserFromTelephone,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/telephone/:telephone", getUserFromTelephone);
router.post("/", addUsers);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
