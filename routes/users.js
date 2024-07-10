const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  getUserFromTelephone,
  addUsers,
  editUser,
  editUserName,
  editUserTelephone,
  editUserRole,
  deleteUser,
} = require("../controllers/users");

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.get("/telephone/:telephone", getUserFromTelephone);
router.post("/", addUsers);
router.put("/:id", editUser);
router.put("/name/:id", editUserName);
router.put("/telephone/:id", editUserTelephone);
router.put("/role/:id", editUserRole);
router.delete("/:id", deleteUser);

module.exports = router;
