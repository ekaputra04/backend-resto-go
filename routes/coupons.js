const express = require("express");
const router = express.Router();
const {
  getAllCoupons,
  getCoupon,
  addCoupons,
  editCoupon,
  deleteCoupon,
  getCouponActive,
  isCouponActive,
} = require("../controllers/coupons");

router.get("/active", getCouponActive);
router.get("/check/:code", isCouponActive);
router.get("/", getAllCoupons);
router.get("/:id", getCoupon);
router.post("/", addCoupons);
router.put("/:id", editCoupon);
router.delete("/:id", deleteCoupon);

module.exports = router;
