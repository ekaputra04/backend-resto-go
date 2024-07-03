const Orders = require("../models/orders");
const Users = require("../models/users");
const Menus = require("../models/menus");
const Coupons = require("../models/coupons");
const ExtraMenus = require("../models/extraMenus");

async function getAllOrders(req, res) {
  try {
    const orders = await Orders.find();
    return res.status(200).json({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Orders.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }
    return res.status(200).json({ data: order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addOrders = async (req, res) => {
  try {
    const ordersToAdd = req.body.data;

    if (!ordersToAdd) {
      return res.status(400).json({ message: "Data Order tidak valid!" });
    }

    const processOrder = async (order) => {
      const { user, coupon, date, isInCart, isDone, details } = order;

      // Validasi user
      if (!user || !user._id) {
        return res.status(400).json({ message: "User tidak valid!" });
      }

      const userExists = await Users.findById(user._id);
      if (!userExists) {
        return res.status(400).json({ message: "User tidak ditemukan!" });
      }

      // Validasi menu dan extraMenu dalam detail order
      let totalPrice = 0;
      for (let detail of details) {
        if (!detail.menu || !detail.menu._id) {
          return res.status(400).json({ message: "Menu tidak valid!" });
        }

        const menuExists = await Menus.findById(detail.menu._id);
        if (!menuExists) {
          return res.status(400).json({
            message: `Menu dengan ID ${detail.menu._id} tidak ditemukan!`,
          });
        }

        // Validate extraMenu if exists
        if (detail.extraMenu && detail.extraMenu._id) {
          const extraMenuExists = await ExtraMenus.findById(
            detail.extraMenu._id
          );
          if (!extraMenuExists) {
            return res.status(400).json({
              message: `Extra menu dengan ID ${detail.extraMenu._id} tidak ditemukan!`,
            });
          }
          detail.extraMenu.price = extraMenuExists.price; // Ensure correct price
        } else {
          detail.extraMenu = null; // Handle missing extraMenu gracefully
        }

        detail.menu.price = menuExists.price; // Ensure correct price
        detail.subTotalMenu =
          menuExists.price * detail.quantity +
          (detail.extraMenu ? detail.extraMenu.price : 0);
        totalPrice += detail.subTotalMenu;
      }

      // Validasi kupon
      let couponData = {
        couponCode: coupon.couponCode,
        isActive: coupon.isActive,
        discount: coupon.discount,
      };

      if (coupon.couponCode != null) {
        const today = new Date();
        const validCoupon = await Coupons.findOne({
          couponCode: coupon.couponCode,
          dateStarted: { $lte: today },
          dateEnded: { $gte: today },
        });

        if (validCoupon) {
          couponData.couponCode = validCoupon.couponCode;
          couponData.isActive = true;
          couponData.discount = validCoupon.discount;
          totalPrice *= (100 - validCoupon.discount) / 100; // Menggunakan diskon jika ada
        }
      }

      const newOrder = await Orders.create({
        user: user,
        coupon: couponData,
        totalPrice: totalPrice,
        date: date,
        isInCart,
        isDone,
        details,
      });

      return newOrder;
    };

    if (!Array.isArray(ordersToAdd)) {
      const newOrder = await processOrder(ordersToAdd);
      return res
        .status(200)
        .json({ message: "Berhasil menambah Order!", data: newOrder });
    } else if (ordersToAdd.length === 0) {
      return res.status(400).json({ message: "Data Order tidak valid!" });
    }

    const listOrders = [];
    for (let i = 0; i < ordersToAdd.length; i++) {
      const newOrder = await processOrder(ordersToAdd[i]);
      listOrders.push(newOrder);
    }

    return res
      .status(200)
      .json({ message: "Berhasil menambah Orders!", data: listOrders });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, couponCode, date, isInCart, isDone, details } = req.body;

    // Validasi order
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }

    // Validasi user
    const userExists = await Users.findById(userId);
    if (!userExists) {
      return res.status(400).json({ message: "User tidak ditemukan!" });
    }

    // Validasi menu dalam detail order
    let totalPrice = 0;
    for (let detail of details) {
      const menuExists = await Menus.findById(detail.menu);
      if (!menuExists) {
        return res
          .status(400)
          .json({ message: `Menu dengan ID ${detail.menu} tidak ditemukan!` });
      }
      totalPrice += menuExists.price * detail.quantity;
    }

    // Validasi kupon
    let couponData = { couponCode: null, isActive: false, discount: 1 };
    if (couponCode) {
      const today = new Date();
      const coupon = await Coupons.findOne({
        code: couponCode,
        dateStarted: { $lte: today },
        dateEnded: { $gte: today },
      });
      if (coupon) {
        couponData = {
          couponCode: coupon.code,
          isActive: true,
          discount: coupon.discount,
        };
        totalPrice *= 1 - coupon.discount / 100; // Menggunakan diskon jika ada
      }
    }

    // Perbarui order
    order.userId = userId;
    order.coupon = couponData;
    order.totalPrice = totalPrice;
    order.date = date;
    order.isInCart = isInCart;
    order.isDone = isDone;
    order.details = details;

    await order.save();

    // Populate details untuk mendapatkan seluruh detail menu
    // await order.populate("details.menu").execPopulate();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit Order!", data: order });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const Order = await Orders.findOne({ _id: id });
    if (!Order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }

    await Orders.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus Order!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const updateCartOrder = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi order
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }

    // Update isInCart menjadi true
    order.isInCart = true;

    await order.save();

    return res
      .status(200)
      .json({ message: "Berhasil memperbarui status cart!", data: order });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const updateOrderDone = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi order
    const order = await Orders.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }

    // Update isInCart menjadi true
    order.isDone = true;

    await order.save();

    return res
      .status(200)
      .json({ message: "Berhasil memperbarui status cart!", data: order });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getOrderMenus = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Validasi order
    const order = await Orders.findById(orderId).populate("details.menu");
    if (!order) {
      return res.status(404).json({ message: "Order tidak ditemukan!" });
    }

    // Ambil daftar menu dari details
    const menus = order.details.map((detail) => ({
      menu: detail.menu,
      quantity: detail.quantity,
    }));

    return res
      .status(200)
      .json({ message: "Berhasil mendapatkan menu dari order!", data: menus });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getUserOrderMenus = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validasi orders berdasarkan userId
    const orders = await Orders.find({ "user._id": userId });
    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "Order tidak ditemukan untuk user tersebut!" });
    }

    // Ambil daftar menu dari details untuk semua orders
    const menus = orders.flatMap((order) =>
      order.details.map((detail) => ({
        menu: detail.menu,
        quantity: detail.quantity,
        extraMenu: detail.extraMenu,
        subTotalMenu: detail.subTotalMenu,
        date: order.date, // tambahkan atribut date
        isDone: order.isDone,
      }))
    );

    return res.status(200).json({ data: menus });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  getOrderMenus,
  getUserOrderMenus,
  addOrders,
  editOrder,
  deleteOrder,
  updateCartOrder,
  updateOrderDone,
};
