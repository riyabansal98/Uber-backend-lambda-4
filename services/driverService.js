const locationService = require('../services/locationService');
const userRepository = require('../repositories/userRepository');

const updateLocation = async (driverId, {latitude, longitude}) => {

    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);

    try {
        const res = await locationService.addDriverLocation(driverId, lat, lon);
        
        await userRepository.updateLocation(driverId, {
            type: 'Point',
            coordinates: [lon, lat]
        });

    }catch {
        console.log(error);
    }

    

}

module.exports = {updateLocation};