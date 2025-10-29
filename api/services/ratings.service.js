const {
  MongoClient,
  mongoUri,
  dbName,
  ObjectId,
} = require("../database/mongo");

const getAllRatingsByAdId = async (adId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ratings = await db
      .collection("ratings")
      .find({ adId: new ObjectId(adId) })
      .toArray();

    return ratings;
  } finally {
    await client.close();
  }
};

const getRatingById = async (ratingId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ratings = await db
      .collection("ratings")
      .findOne({ _id: new ObjectId(ratingId) });

    return ratings;
  } finally {
    await client.close();
  }
};

const insertRating = async (ratingData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db
      .collection("ratings")
      .insertOne({ ...ratingData, date: new Date() });

    return result.insertedId;
  } finally {
    await client.close();
  }
};

const updateRating = async (ratingId, ratingData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db
      .collection("ratings")
      .updateOne({ _id: new ObjectId(ratingId) }, { $set: { ...ratingData } });
  } finally {
    await client.close();
  }
};

const deleteRatingById = async (ratingId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("ratings").deleteOne({ _id: new ObjectId(ratingId) });
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllRatingsByAdId,
  getRatingById,
  insertRating,
  updateRating,
  deleteRatingById,
};
