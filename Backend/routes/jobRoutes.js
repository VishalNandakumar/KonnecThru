const express = require('express');
const router = express.Router();
const { postJob } = require('../controllers/jobController');

// POST endpoint for job posting
router.post('/jobposting', postJob);

module.exports = router;
