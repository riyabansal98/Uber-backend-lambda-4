const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const {updateLocation} = require('../controllers/driverController');
const router = express.Router();

//Route to get previous bookings
//router.get('/bookings', getDriverBookings);

//Route to get updated driver location
router.post('/location', authMiddleware, updateLocation);

module.exports = router;

