const mongoose = require("mongoose");

const ReferralSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  referralName: { type: String, required: true },
  referralEmail: { type: String, required: true },
  referralCompany: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Referral", ReferralSchema);
