const JobApplication = require("../models/JobApplication");

// Controller to handle job application submission
const submitJobApplication = async (req, res) => {
  try {
    const { userId, jobPostingId, referralEmail, referralId, whyHire } =
      req.body;

    // Create a new JobApplication document
    const newApplication = new JobApplication({
      userId,
      jobPostingId,
      referralEmail,
      referralId,
      whyHire,
    });

    // Save the document to the database
    const savedApplication = await newApplication.save();

    // Respond with the saved application
    res.status(201).json({
      message: "Job application submitted successfully",
      application: savedApplication,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to submit job application", error });
  }
};

const getAllJobApplications = async (req, res) => {
  try {
    // Fetch all job applications from the database
    const applications = await JobApplication.find();
    // Respond with the list of job applications
    res.status(200).json({
      message: "Job applications fetched successfully",
      applications,
    });
  } catch (error) {
    // Handle errors
    res
      .status(500)
      .json({ message: "Failed to fetch job applications", error });
  }
};

module.exports = { submitJobApplication, getAllJobApplications };
