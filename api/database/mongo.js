require("dotenv").config();

const MongoClient = require("mongodb").MongoClient;

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

module.exports = { MongoClient, mongoUri, dbName };
