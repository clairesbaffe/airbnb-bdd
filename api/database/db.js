require('dotenv').config();

const pgp = require("pg-promise")();
const db = pgp(process.env.POSTGRES_URI);


module.exports = db;