const Booking = require('../models/bookings')

const createBooking = async (bookingData) => {

    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
}

module.exports = {createBooking};