const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

//loads the environment variables in the .env file of production/ test / developmemnt using dotenv config
require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

const config = {};
//if we are tyring to connect to our production db we need to send the url with its password in the .env file
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

//error if no database is connected
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
module.exports = new Pool(config);
