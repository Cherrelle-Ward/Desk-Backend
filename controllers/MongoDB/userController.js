const User = require("../../models/userSchema");
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
  console.log(userName, "i am userInput");
  try {
    let user = "guest";
    if (user === null) {
      user = "guest";
    } else {
      user = await User.findOne({ userName });
      if (user.userName == userName) {
        res.status(200).json({ msg: "User has been signed in" });
        res.status(200).json(user);
      }
      if (user.userName !== userName) {
        const user = await User.create({ userName });
        console.log(user, "I am user in create");
        res.status(200).json(user);
        res.status(200).json({ msg: "User has been created" });
      } else {
        console.log("this is the else");
      }
    }

    // for (user1 of user) {
    //   if (user1 == userName) {
    //     return "User already exists";
    //   } else {
    //     user = await User.create({ userName });
    //     res.status(200).json(user);
    //     console.log(user);
    //   }
  } catch (error) {
    console.log(error.message);
  }

  //todo check if user is already in the system
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
