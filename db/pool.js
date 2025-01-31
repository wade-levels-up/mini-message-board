require('dotenv').config();
const { Pool } = require("pg");

module.exports = new Pool({
    connectionString: process.env.RAILWAY_PROD_CONNECTION_STRING
})
