
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

    async storeNotifiedDrivers(bookingId, driverIds) {
  
        for (const driverId of driverIds) {
          const addedCount = await redisClient.sAdd(`notifiedDrivers:${bookingId}`, driverId);
          console.log(`Added driver ${driverId} to the set for booking ${bookingId}, result: ${addedCount}`);
        }
    }

    async getNotifiedDrivers(bookingId) {
        const nearbyDrivers = await redisClient.sMembers(`notifiedDrivers:${bookingId}`);
        return nearbyDrivers;
    }
}

module.exports = new locationService();