const bookingRepository = require('../repositories/bookingRepository');
const locationService = require('./locationService');
const {haversineDistance } = require('../utils/distance');
const BASIC_FARE = 50;
const RATE_PER_KM = 12;

const createBooking = async({passengerId, source, destination}) => {

    const distance = haversineDistance(source.latitude, source.longitude, destination.latitude, destination.longitude);
    const fare = BASIC_FARE * (distance * RATE_PER_KM);
    const bookingData = {
        passenger: passengerId,
        source,
        destination,
        fare,
        status: 'pending',
        distance
    };

    const booking = await bookingRepository.createBooking(bookingData);
    return booking;
}

const findNearbyDrivers = async (location, radius = 5) => {
    const longitude = parseFloat(location.longitude);
    const latitude = parseFloat(location.latitude);
  
    // Ensure the radius is a number
    const radiusKm = parseFloat(radius);
  
    if (isNaN(longitude) || isNaN(latitude) || isNaN(radiusKm)) {
      throw new Error('Invalid coordinates or radius');
    }
  
    const nearbyDrivers = await locationService.findNearbyDrivers(longitude, latitude, radiusKm);
  
    return nearbyDrivers;
  };

const assignDriver = async (bookingId, driverId) => {
    console.log(bookingId)
    const booking = await bookingRepository.updateBookingStatus(bookingId, driverId, 'confirmed');
    if (!booking) throw new Error('Booking already confirmed or does not exist');
    return booking;
  };


module.exports = {createBooking, findNearbyDrivers, assignDriver};