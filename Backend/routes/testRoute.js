const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.status(200).send('Test route is working!');
});

module.exports = router;
