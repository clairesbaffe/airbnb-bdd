const pgp = require("pg-promise")();
const db = pgp("postgres://admin:password@127.0.0.1:5432/airbnb");


module.exports = db;