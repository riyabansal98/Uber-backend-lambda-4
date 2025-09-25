const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {updateLocation, confirmBooking} = require('../controllers/driverController');
const router = express.Router();

router.post('/location', authMiddleware, updateLocation);
router.post('/confirm', authMiddleware, confirmBooking);

module.exports = router;

