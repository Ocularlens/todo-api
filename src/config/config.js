require("dotenv").config();

module.exports = {
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",
  MYSQL_USERNAME: process.env.MYSQL_USERNAME || "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_HOST: process.env.MYSQL_HOST || "",
  NODE_ENV: process.env.NODE_ENV || "",
  MYSQL_PORT: process.env.MYSQL_PORT || 3306,
  PORT: process.env.DATABASE_URL || 3000,
};
