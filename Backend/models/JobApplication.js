const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  jobPostingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  applicationStatus: { type: String, default: "pending" },
  applicationDate: { type: Date, default: Date.now },
  referralEmail: { type: String },
  referralId: { type: mongoose.Schema.Types.ObjectId, ref: "Referral" },
  whyHire: { type: String },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
