const bookingService = require('../services/bookingService');
const axios = require('axios');

const createBooking = async (req, res) => {

    try{
        const  {source, destination} = req.body;
        //create a booking > persist a booking object in mongo db
        const booking = await bookingService.createBooking({passengerId: req.user._id, source, destination});    
        // find nearby drivers >> using redis DB
        // notify the nearby drivers
        const nearbyDrivers = await bookingService.findNearbyDrivers(source);
        
        const driverIds = nearbyDrivers.map(driver => driver[0]);
                        
        const rideInfo = {
            source,
            destination,
            passengerId: req.user._id,
            estimatedFare: booking.fare, 
            distance: booking.distance,
            pickupTime: new Date().toISOString()
        };
        
        try {
            const notificationResponse = await axios.post('http://localhost:3001/api/notify-drivers', {
                rideId: booking._id.toString(),
                rideInfo,
                driverIds
            });
            
            console.log('Notification sent successfully:', notificationResponse.data);
            
        } catch (notificationError) {
            console.error('Failed to notify drivers:', notificationError.message);
        }
        
        res.status(201).send({data: booking, success: true, error: null, message: "Successfully created the booking"});
    }catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createBooking};