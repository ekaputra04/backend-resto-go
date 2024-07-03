const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOrder,
  addOrders,
  editOrder,
  deleteOrder,
  updateCartOrder,
  updateOrderDone,
  getOrderMenus,
  getUserOrderMenus,
} = require("../controllers/orders");

router.get("/", getAllOrders);
router.get("/:id", getOrder);
router.get("/:orderId/menus", getOrderMenus);
router.get("/menus/:userId", getUserOrderMenus);
router.post("/", addOrders);
router.put("/:id", editOrder);
router.put("/update-cart/:id", updateCartOrder);
router.put("/update-order/:id", updateOrderDone);
router.delete("/:id", deleteOrder);

module.exports = router;
