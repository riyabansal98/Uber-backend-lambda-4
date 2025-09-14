
const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('connect', () => {
    console.log('Connected to Redis')
})

redisClient.on('error', (err) => {
    console.log('Redis connection error: ', err);
});

redisClient.connect();

module.exports = {redisClient};

