const Booking = require('../models/bookings')

const createBooking = async (bookingData) => {

    const booking = new Booking(bookingData);
    await booking.save();
    return booking;
}

const updateBookingStatus = async (bookingId, driverId, status) => {
    return Booking.findOneAndUpdate(
      { _id: bookingId, status: 'pending' },
      { driver: driverId, status },
      { new: true }
    );
};

module.exports = {createBooking, updateBookingStatus};