const express = require("express");
const router = express.Router();
const {
  submitJobApplication,
  getAllJobApplications,
} = require("../controllers/jobApplicationController"); // Import the controller

// POST route to submit a job application
router.post("/apply", submitJobApplication);

router.get("/application-postings", getAllJobApplications);

module.exports = router;
