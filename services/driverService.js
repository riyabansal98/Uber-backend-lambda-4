const locationService = require('../services/locationService');

const updateLocation = async (driverId, {latitude, longitude}) => {

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    try {
        const res = await locationService.addDriverLocation(driverId, lat, lon);
        //update the driver location to redis
    }catch {
        console.log(error);
    }

    // update driver location to mongoDB
    

}

module.exports = {updateLocation};