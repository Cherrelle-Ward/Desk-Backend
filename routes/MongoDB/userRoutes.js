const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  getUserByID,
  deleteUser,
  updateUser,
} = require("../../controllers/MongoDB/userController");

// getting all users
router.get("/", getUsers);

// get user by ID
router.get("/:id", getUserByID);

// creating users
router.post("/", addUser);

// delete user
router.delete("/:id", deleteUser);

//update user
router.patch("/:id", updateUser);

module.exports = router;
