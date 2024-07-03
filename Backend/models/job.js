const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    companyName: { type: String, required: true },
    amount: { type: Number, required: true },
    employmentType: [{ type: String, required: true }],
    workingSchedule: { type: String, required: true },
    salaryType: { type: String, required: true },
    paymentFrequency: { type: String, required: true },
    salaryNegotiable: { type: Boolean, default: false },
    multipleCandidates: { type: Boolean, default: false },
    userId: { type: String, required: true },
    userEmail: { type: String, required: true }
});

module.exports = mongoose.model('Job', jobSchema);
