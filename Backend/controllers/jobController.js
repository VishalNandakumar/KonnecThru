// jobController.js
const Job = require('../models/job'); // Assuming you have a Job model

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
            userEmail: req.body.userEmail
        });

        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
