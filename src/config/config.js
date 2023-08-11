require("dotenv").config();

module.exports = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_HOST: process.env.MYSQL_HOST || "",
  NODE_ENV: process.env.NODE_ENV || "",
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  PORT: process.env.DATABASE_URL || 3000,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_USER: process.env.REDIS_USER || "default",
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
};
