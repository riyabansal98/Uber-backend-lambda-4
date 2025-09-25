const driverService = require('../services/driverService');
const locationService = require('../services/locationService');
const bookingService = require('../services/bookingService');
const axios = require('axios');

const updateLocation = async(req, res) => {

    try {
        const {latitude, longitude} = req.body;

        if(typeof latitude != 'number' || typeof longitude != 'number') {
            throw new Error('Latitude and longitude must be numbers');
        }

        driverService.updateLocation(req.user._id, {latitude, longitude});
        res.status(201).send({success: true, error: null, message: "Location updated for driver"});

    }catch(error) {
        res.status(400).send({error: error.message});
    }
}

const confirmBooking = async(req, res) => {
    
    const { bookingId } = req.body;

    //update the booking status
    const booking = await bookingService.assignDriver(bookingId, req.user._id);
    console.log(booking, bookingId);
    //get the list of drivers who were notified about this booking. 
    const notifiedDriverIds = await locationService.getNotifiedDrivers(bookingId);
    console.log("notified driver Ids", notifiedDriverIds);
    try {                                             
        const notificationResponse = await 
        axios.post('http://localhost:3001/api/remove-ride-notification', {
            rideId: bookingId,
            driverIds: notifiedDriverIds
        });
           
        console.log('Successfully removed ride notifications:', notificationResponse.data);

    } catch (notificationError) {
        console.error('Failed to notify drivers:', notificationError.message);
    }
    res.status(201)
    .send({data:booking, success: true, error: null, message: "successfully confirmed booking"});

}

module.exports = {updateLocation, confirmBooking};