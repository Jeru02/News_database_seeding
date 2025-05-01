const { Pool } = require("pg");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({ path: `${__dirname}/../.env.${ENV}` });

//loads the environment vaibles in the .env file of production/ test / developmemnt
const config = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

module.exports = new Pool(config);

//error handling
if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
} else {
  console.log(`Connected to ${process.env.PGDATABASE}`);
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}
