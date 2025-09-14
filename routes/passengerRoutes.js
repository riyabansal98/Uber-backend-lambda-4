const express = require('express');
const {createBooking} = require('../controllers/passengerController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/ride', authMiddleware, createBooking);

module.exports = router;