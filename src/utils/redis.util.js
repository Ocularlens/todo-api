const Redis = require("ioredis");
const {
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  REDIS_USER,
} = require("../config/config");

const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USER,
  password: REDIS_PASSWORD,
});

module.exports = redisClient;
