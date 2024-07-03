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
  getCouponFromName,
} = require("../controllers/coupons");

router.get("/active", getCouponActive);
router.get("/check/:couponCode", isCouponActive);
router.get("/name/:couponCode", getCouponFromName);
router.get("/", getAllCoupons);
router.get("/:id", getCoupon);
router.post("/", addCoupons);
router.put("/:id", editCoupon);
router.delete("/:id", deleteCoupon);

module.exports = router;
