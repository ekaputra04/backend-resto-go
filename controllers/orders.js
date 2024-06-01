const Orders = require("../models/orders");
const Users = require("../models/users");
const Menus = require("../models/menus");
const Coupons = require("../models/coupons");

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
      const { userId, couponCode, date, isInCart, isDone, details } = order;

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
          return res.status(400).json({
            message: `Menu dengan ID ${detail.menu} tidak ditemukan!`,
          });
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

      const newOrder = await Orders.create({
        userId,
        coupon: couponData,
        totalPrice,
        date,
        isInCart,
        isDone,
        details,
      });

      // Populate details untuk mendapatkan seluruh detail menu
      // await newOrder.populate("details.menu").execPopulate();

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

module.exports = {
  getAllOrders,
  getOrder,
  getOrderMenus,
  addOrders,
  editOrder,
  deleteOrder,
  updateCartOrder,
  updateOrderDone,
};
