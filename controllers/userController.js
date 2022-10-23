const user = require("../models/userSchema");

// get all users
const getUsers = async (req, res) => {
  const user = await user.find();
  res.status(200).json(user);
};

//create(POST) a user
const addUser = async (req, res) => {};

// delete user

// update user
