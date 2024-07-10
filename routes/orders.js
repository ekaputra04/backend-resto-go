const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getAllOrdersDone,
  getAllOrdersNotDone,
  getOrder,
  addOrders,
  editOrder,
  deleteOrder,
  updateCartOrder,
  updateOrderIsDone,
  getOrderMenus,
  getUserOrderMenus,
  getUserOrderMenusHistory,
} = require("../controllers/orders");

router.get("/", getAllOrders);
router.get("/done/", getAllOrdersDone);
router.get("/not-done/", getAllOrdersNotDone);
router.get("/:id", getOrder);
router.get("/:orderId/menus", getOrderMenus);
router.get("/menus/:userId", getUserOrderMenus);
router.get("/history/:userId", getUserOrderMenusHistory);
router.post("/", addOrders);
router.put("/:id", editOrder);
router.put("/update-cart/:id", updateCartOrder);
router.put("/update-order/:id", updateOrderIsDone);
router.delete("/:id", deleteOrder);

module.exports = router;
