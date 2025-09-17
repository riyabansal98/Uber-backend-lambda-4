
const {redisClient} = require('../utils/redisClient');

class locationService {

    async addDriverLocation(driverId, longitude, latitude) {

        try {
            await redisClient.sendCommand([
                'GEOADD',
                'drivers',
                longitude.toString(),
                latitude.toString(),
                driverId.toString(),
            ]);
        }catch{
            console.log("Cannot add to redis", error);
        }
    }

    async findNearbyDrivers(longitude, latitude, radiusKm) {
        const nearbyDrivers = await redisClient.sendCommand([
          'GEORADIUS',
          'drivers',
          longitude.toString(),
          latitude.toString(),
          radiusKm.toString(),
          'km',
          'WITHCOORD'
        ]);
    
        return nearbyDrivers;
      }
}

module.exports = new locationService();