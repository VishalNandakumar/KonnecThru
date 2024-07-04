const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");

// Test route
router.post("/referral-post", async (req, res) => {
  const {
    userID,
    userEmail,
    referralName,
    referralEmail,
    referralCompany,
    description,
  } = req.body;

  try {
    const newReferral = new Referral({
      userId: userID,
      email: userEmail,
      referralName: referralName,
      referralEmail: referralEmail,
      referralCompany: referralCompany,
      description: description,
    });

    await newReferral.save();
    res.status(201).json({
      message: "referral posting added successfully",
      Refferal: newReferral,
    });
  } catch (error) {
    console.error("Error adding referral post:", error);
    res.status(500).json({
      error: "Failed to add referral post",
      details: error.message,
    });
  }
});

module.exports = router;
