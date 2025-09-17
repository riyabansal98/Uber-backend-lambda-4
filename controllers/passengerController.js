const bookingService = require('../services/bookingService');

const createBooking = async (req, res) => {

    try{
        const  {source, destination} = req.body;
        //create a booking > persist a booking object in mongo db
        const booking = await bookingService.createBooking({passengerId: req.user._id, source, destination});    
        // find nearby drivers >> using redis DB
        const driverIds = [];
        console.log(source);
        const nearbyDrivers = await bookingService.findNearbyDrivers(source);
        console.log(nearbyDrivers);
        // notify the nearby drivers
        
        res.status(201).send({data: booking, success: true, error: null, message: "Successfully created the booking"});
    }catch(error) {
        res.status(400).send(error.message);
    }
}

module.exports = {createBooking};