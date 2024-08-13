// jobController.js
const Job = require("../models/Job"); // Assuming you have a Job model

// Post a job
exports.postJob = async (req, res) => {
  try {
    const job = new Job({
      jobTitle: req.body.jobTitle,
      jobDescription: req.body.jobDescription,
      companyName: req.body.companyName,
      amount: req.body.amount,
      employmentType: req.body.employmentType,
      workingSchedule: req.body.workingSchedule,
      salaryType: req.body.salaryType,
      paymentFrequency: req.body.paymentFrequency,
      salaryNegotiable: req.body.salaryNegotiable,
      multipleCandidates: req.body.multipleCandidates,
      userId: req.body.userId,
      userEmail: req.body.userEmail,
    });

    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateJobStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { approvalStatus: "approved" },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(job);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating job status", error: error });
  }
};
