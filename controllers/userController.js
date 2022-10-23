const User = require("../models/userSchema");
const mongoose = require("mongoose");

// get all users
const getUsers = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
};

// get a user by ID
const getUserByID = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid id" });
  }

  const user = await User.findOne().where({ id });
  res.status(200).json(user);
};

//create(POST) a user
const addUser = async (req, res) => {
  const { userName } = req.body;
  try {
    //  const user = await User.find().where({ userName });
    //  user = user.UserName.filter((user) => user.userName == userName);

    user = await User.create({ userName });
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
};

// delete user

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid ID" });
  }
  const user = await User.findOneAndDelete({ _id: id });

  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(400).json({ error: "user does not exist" });
  }
};

// update user
const updateUser = async (req, res) => {
  const { id } = req.params;
  userName = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Not a valid ID" });
  }
  try {
    const user = await User.findByIdAndUpdate({ _id: id }, { $set: userName });
    if (user) {
      return res.status(200).json(user);
    } else {
      res.status(400).json({ error: "user does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  addUser,
  getUserByID,
  deleteUser,
  updateUser,
};
