const express = require("express");
const router = express.Router();
const Referral = require("../models/Referral");
const mongoose = require('mongoose');
const Job = require("../models/Job"); // Import Job model
const User = require("../models/User"); // Import User model if needed for notifications


router.post("/referral-post", async (req, res) => {
  const {
    userID,
    userEmail,
    referralName,
    referralEmail,
    referralCompany,
    description,
    jobId
  } = req.body;

  try {
    // Validate user exists by custom userId
    const user = await User.findOne({ userId: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newReferral = new Referral({
      userId: userID, // Store userId as a string
      email: userEmail,
      referralName: referralName,
      referralEmail: referralEmail,
      referralCompany: referralCompany,
      description: description,
      jobPostingId: jobId
    });

    await newReferral.save();

    // Find the job posting and update it with the new referral
    const jobPosting = await Job.findById(jobId);
    if (!jobPosting) {
      return res.status(404).json({ message: "Job posting not found" });
    }
    jobPosting.referrals.push(newReferral._id);
    await jobPosting.save();

    // Notify the job poster (this assumes you have a way to identify and notify the job poster)
    const jobPoster = await User.findOne({ userId: jobPosting.userId });
    if (jobPoster) {
      console.log(`Notification sent to job poster: ${jobPoster.email}`);
      // Implement your notification logic here
    }

    res.status(201).json({
      message: "Referral posting added successfully",
      referral: newReferral,
    });
  } catch (error) {
    console.error("Error adding referral post:", error);
    res.status(500).json({
      error: "Failed to add referral post",
      details: error.message,
    });
  }
});

router.get("/referralpostings", async (req, res) => {
  try {
    const referrals = await Referral.find({});
    res.json(referrals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referrals", error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const referral = await Referral.findById(req.params.id);
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }
    res.json(referral);
  } catch (error) {
    res.status(500).json({ message: "Error fetching referral", error: error.message });
  }
});

module.exports = router;
