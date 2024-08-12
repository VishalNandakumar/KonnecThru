const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { userId, email, name, dob, phoneNumber, userType } = req.body;

  try {
    const newUser = new User({
      userId,
      email,
      name,
      dob,
      phoneNumber,
      userType,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      error: "Failed to register user",
      details: error.message,
    });
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find({});
    console.log("usersusersusersusers", users);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ", error: error });
  }
});

router.get("/:firebaseUserId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.firebaseUserId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ message: "Error fetching user details", error: error.message });
  }
});

module.exports = router;
