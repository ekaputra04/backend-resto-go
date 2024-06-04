const MenuCategories = require("../models/menuCategories");

async function getAllMenuCategories(req, res) {
  try {
    const menuCategories = await MenuCategories.find();
    return res.status(200).json({ data: menuCategories });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await MenuCategories.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getMenuCategoryFromName = async (req, res) => {
  try {
    const { name } = req.params;
    const menuCategory = await MenuCategories.findOne({ name: name });
    if (!menuCategory) {
      return res
        .status(404)
        .json({ message: "Kategori menu tidak ditemukan!" });
    }
    return res.status(200).json({ data: menuCategory });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addMenuCategories = async (req, res) => {
  try {
    const menuCategoriesToAdd = req.body.data;

    if (!menuCategoriesToAdd) {
      return res.status(400).json({ message: "Data user tidak valid!" });
    }

    if (!Array.isArray(menuCategoriesToAdd)) {
      const { name } = menuCategoriesToAdd;

      await MenuCategories.create({
        name,
      });

      return res.status(200).json({
        message: "Berhasil menambah kategori menu!",
        data: menuCategoriesToAdd,
      });
    } else if (menuCategoriesToAdd.length === 0) {
      return res
        .status(400)
        .json({ message: "Data kategori menu tidak valid!" });
    }

    for (let i = 0; i < menuCategoriesToAdd.length; i++) {
      const { name } = menuCategoriesToAdd[i];

      await MenuCategories.create({
        name,
      });
    }

    return res.status(200).json({
      message: "Berhasil menambah kategori menu!",
      data: menuCategoriesToAdd,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editMenuCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const menuCategory = await MenuCategories.findOne({ _id: id });

    if (!menuCategory) {
      return res
        .status(404)
        .json({ message: "Kategori menu tidak ditemukan!" });
    }

    menuCategory.name = name;

    await menuCategory.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit kategori menu!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteMenuCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const menuCategory = await MenuCategories.findOne({ _id: id });
    if (!menuCategory) {
      return res
        .status(404)
        .json({ message: "Kategori menu tidak ditemukan!" });
    }

    await MenuCategories.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus kategori menu!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenuCategories,
  getMenuCategory,
  addMenuCategories,
  editMenuCategory,
  deleteMenuCategory,
  getMenuCategoryFromName,
};
