const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');
const Job = require('../models/job');

// POST endpoint for job posting
router.post('/jobposting', postJob);


router.get('/jobpostings', async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error: error });
    }
});

module.exports = router;
