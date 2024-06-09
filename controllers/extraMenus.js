const ExtraMenus = require("../models/extraMenus");

async function getAllExtraMenus(req, res) {
  try {
    const extraMenus = await ExtraMenus.find();
    return res.status(200).json({ data: extraMenus });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getExtraMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const extraMenu = await ExtraMenus.findOne({ _id: id });
    if (!extraMenu) {
      return res.status(404).json({ message: "Extra menu tidak ditemukan!" });
    }
    return res.status(200).json({ data: extraMenu });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getExtraMenuFromName = async (req, res) => {
  try {
    const { name } = req.params;
    const menu = await ExtraMenus.findOne({ name: name });
    if (!menu) {
      return res.status(404).json({ message: "Extra menu tidak ditemukan!" });
    }
    return res.status(200).json({ data: menu });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addExtraMenus = async (req, res) => {
  try {
    const extraMenusToAdd = req.body.data;

    if (!extraMenusToAdd) {
      return res.status(400).json({ message: "Data extra menu tidak valid!" });
    }

    if (!Array.isArray(extraMenusToAdd)) {
      const { name, price } = extraMenusToAdd;

      await ExtraMenus.create({
        name,
        price,
      });

      return res.status(200).json({
        message: "Berhasil menambah extra menu!",
        data: extraMenusToAdd,
      });
    } else if (extraMenusToAdd.length === 0) {
      return res.status(400).json({ message: "Data extra menu tidak valid!" });
    }

    for (let i = 0; i < extraMenusToAdd.length; i++) {
      const { name, price } = extraMenusToAdd[i];

      await ExtraMenus.create({
        name,
        price,
      });
    }

    return res.status(200).json({
      message: "Berhasil menambah extra menus!",
      data: extraMenusToAdd,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editExtraMenu = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { id } = req.params;

    const extraMenu = await ExtraMenus.findOne({ _id: id });

    if (!extraMenu) {
      return res.status(404).json({ message: "Extra menu tidak ditemukan!" });
    }

    extraMenu.name = name;
    extraMenu.price = price;

    await extraMenu.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit extra menu!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteExtraMenu = async (req, res) => {
  try {
    const { id } = req.params;

    const extraMenu = await ExtraMenus.findOne({ _id: id });
    if (!extraMenu) {
      return res.status(404).json({ message: "Extra menu tidak ditemukan!" });
    }

    await ExtraMenus.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus extra menu!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllExtraMenus,
  getExtraMenu,
  getExtraMenuFromName,
  addExtraMenus,
  editExtraMenu,
  deleteExtraMenu,
};
