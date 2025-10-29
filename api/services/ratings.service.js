const { MongoClient, mongoUri, dbName } = require("../database/mongo");

const getAllRatings = async () => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ratings = await db.collection("ratings").find().toArray();
    return ratings;
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllRatings,
};
