const Redis = require("ioredis");
const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USER,
} = require("../config/config");



const initializeRedis = async () => {
  try {
    const redisClient = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      username: REDIS_USER,
      password: REDIS_PASSWORD,
    });
    await redisClient.ping();
    console.log("Connected to Redis successfully");
    return redisClient;
  } catch (error) {
    console.error("Failed to connect to Redis:", error);
    throw error;
  }
};

module.exports = initializeRedis;
