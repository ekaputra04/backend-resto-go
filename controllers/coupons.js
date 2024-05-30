const Coupons = require("../models/coupons");

async function getAllCoupons(req, res) {
  try {
    const coupons = await Coupons.find();
    return res.status(200).json({ data: coupons });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupons.findOne({ _id: id });
    if (!coupon) {
      return res.status(404).json({ message: "Kupon tidak ditemukan!" });
    }
    return res.status(200).json({ data: coupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addCoupons = async (req, res) => {
  try {
    const couponsToAdd = req.body.data;

    if (!couponsToAdd) {
      return res.status(400).json({ message: "Data kupon tidak valid!" });
    }

    if (!Array.isArray(couponsToAdd)) {
      const { code, discount, dateStarted, dateEnded } = couponsToAdd;

      await Coupons.create({
        code,
        discount,
        dateStarted,
        dateEnded,
      });

      return res
        .status(200)
        .json({ message: "Berhasil menambah kupon!", data: couponsToAdd });
    } else if (couponsToAdd.length === 0) {
      return res.status(400).json({ message: "Data kupon tidak valid!" });
    }

    for (let i = 0; i < couponsToAdd.length; i++) {
      const { code, discount, dateStarted, dateEnded } = couponsToAdd[i];

      await Coupons.create({
        code,
        discount,
        dateStarted,
        dateEnded,
      });
    }

    return res
      .status(200)
      .json({ message: "Berhasil menambah kupon!", data: couponsToAdd });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editCoupon = async (req, res) => {
  try {
    const { code, discount, dateStarted, dateEnded } = req.body;
    const { id } = req.params;

    const coupon = await Coupons.findOne({ _id: id });

    if (!coupon) {
      return res.status(404).json({ message: "Kupon tidak ditemukan!" });
    }

    coupon.code = code;
    coupon.discount = discount;
    coupon.dateStarted = dateStarted;
    coupon.dateEnded = dateEnded;

    await coupon.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit kupon!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    const coupon = await Coupons.findOne({ _id: id });
    if (!coupon) {
      return res.status(404).json({ message: "Kupon tidak ditemukan!" });
    }

    await Coupons.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus kupon!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getCouponActive = async (req, res) => {
  try {
    const today = new Date();
    const activeCoupons = await Coupons.find({
      dateStarted: { $lte: today },
      dateEnded: { $gte: today },
    });
    return res.status(200).json({ data: activeCoupons });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const isCouponActive = async (req, res) => {
  try {
    const { code } = req.params;
    const today = new Date();
    const coupon = await Coupons.findOne({
      code: code,
      dateStarted: { $lte: today },
      dateEnded: { $gte: today },
    });

    if (!coupon) {
      return res.status(404).json({ message: "Kode kupon tidak aktif!" });
    }

    return res.status(200).json({ data: coupon });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllCoupons,
  getCoupon,
  addCoupons,
  editCoupon,
  deleteCoupon,
  getCouponActive,
  isCouponActive,
};
