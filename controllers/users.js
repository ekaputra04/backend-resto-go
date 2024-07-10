const Users = require("../models/users");

async function getAllUsers(req, res) {
  try {
    const users = await Users.find();
    return res.status(200).json({ data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Users.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserFromTelephone = async (req, res) => {
  try {
    const { telephone } = req.params;
    const user = await Users.findOne({ telephone: telephone });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }
    return res.status(200).json({ data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const addUsers = async (req, res) => {
  try {
    const usersToAdd = req.body.data;

    if (!usersToAdd) {
      return res.status(400).json({ message: "Data user tidak valid!" });
    }

    if (!Array.isArray(usersToAdd)) {
      const { name, telephone, isAdmin } = usersToAdd;

      await Users.create({
        name,
        telephone,
        isAdmin,
      });

      return res
        .status(200)
        .json({ message: "Berhasil menambah user!", data: usersToAdd });
    } else if (usersToAdd.length === 0) {
      return res.status(400).json({ message: "Data user tidak valid!" });
    }

    for (let i = 0; i < usersToAdd.length; i++) {
      const { name, telephone, isAdmin } = usersToAdd[i];

      await Users.create({
        name,
        telephone,
        isAdmin,
      });
    }

    return res
      .status(200)
      .json({ message: "Berhasil menambah users!", data: usersToAdd });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { name, telephone, isAdmin } = req.body;
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    user.name = name;
    user.telephone = telephone;
    user.isAdmin = isAdmin;

    await user.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit user!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editUserName = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    user.name = name;

    await user.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit nama user!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editUserTelephone = async (req, res) => {
  try {
    const { telephone } = req.body;
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    user.telephone = telephone;

    await user.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit telephone user!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const editUserRole = async (req, res) => {
  try {
    const { isAdmin } = req.body;
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    user.isAdmin = isAdmin;

    await user.save();

    return res
      .status(200)
      .json({ message: "Berhasil mengedit role user!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    await Users.deleteOne({ _id: id });

    return res
      .status(200)
      .json({ message: "Berhasil menghapus user!", data: req.body });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  getUserFromTelephone,
  addUsers,
  editUser,
  editUserName,
  editUserTelephone,
  editUserRole,
  deleteUser,
};
