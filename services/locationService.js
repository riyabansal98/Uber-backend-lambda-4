
const {redisClient} = require('../utils/redisClient');

class locationService {

    async addDriverLocation(driverId, latitude, longitude) {

        try {
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                latitude.toString(),
                longitude.toString(),
                driverId.toString(),
            ]);
        }catch{
            console.log("Cannot add to redis", error);
        }
    }
}


module.exports = new locationService();