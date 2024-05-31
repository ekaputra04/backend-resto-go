const Menus = require("../models/menus");
const MenuCategories = require("../models/menuCategories");

async function getAllMenus(req, res) {
  try {
    const menus = await Menus.find();
    return res.status(200).json({ data: menus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await Menus.findOne({ _id: id });
    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan!" });
    }
    return res.status(200).json({ data: menu });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addMenus = async (req, res) => {
  try {
    const menusToAdd = req.body.data;

    if (!menusToAdd) {
      return res.status(400).json({ message: "Data menu tidak valid!" });
    }

    if (!Array.isArray(menusToAdd)) {
      const { name, price, category, url_image } = menusToAdd;

      await Menus.create({
        name,
        price,
        category,
        url_image,
      });

      return res
        .status(200)
        .json({ message: "Berhasil menambah menu!", data: menusToAdd });
    } else if (menusToAdd.length === 0) {
      return res.status(400).json({ message: "Data menu tidak valid!" });
    }

    for (let i = 0; i < menusToAdd.length; i++) {
      const { name, price, category, url_image } = menusToAdd;

      await Menus.create({
        name,
        price,
        category,
        url_image,
      });
    }

    return res
      .status(200)
      .json({ message: "Berhasil menambah menu!", data: menusToAdd });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editMenu = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    const { id } = req.params;

    let updatedMenu = await Menus.findByIdAndUpdate(
      id,
      { name, price, category },
      { new: true }
    );

    if (!updatedMenu) {
      return res.status(404).json({ message: "Menu tidak ditemukan!" });
    }

    // Periksa apakah kategori dengan ID yang diberikan ada
    if (category) {
      const categoryExists = await MenuCategories.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Kategori tidak ditemukan!" });
      }
    }

    return res
      .status(200)
      .json({ message: "Berhasil mengedit menu!", data: updatedMenu });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const menu = await Menus.findOne({ _id: id });
    if (!menu) {
      return res.status(404).json({ message: "Menu tidak ditemukan!" });
    }

    await Menus.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus menu!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllMenus, getMenu, addMenus, editMenu, deleteMenu };
