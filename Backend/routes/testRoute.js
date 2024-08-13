const express = require('express');
const router = express.Router();

// Test route
router.get('/Check-status', (req, res) => {
    res.status(200).send('Your backend is Up and working! 🎉🎉🎉🎉');
});

module.exports = router;
