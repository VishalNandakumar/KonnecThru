const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Ensure this path is correct

// POST endpoint for user registration
router.post('/register', async (req, res) => {
  const { userId, email, name, dob, phoneNumber, userType } = req.body;

  try {
    const newUser = new User({
      userId,
      email,
      name,
      dob,
      phoneNumber,
      userType
    });

    await newUser.save();
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      error: 'Failed to register user',
      details: error.message
    });
  }
});

module.exports = router;
