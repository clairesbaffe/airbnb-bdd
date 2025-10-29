const {
  MongoClient,
  mongoUri,
  dbName,
  ObjectId,
} = require("../database/mongo");

const getAllAds = async () => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ads = await db.collection("ads").find().toArray();

    return ads;
  } finally {
    await client.close();
  }
};

const getAdById = async (adId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const ads = await db.collection("ads").findOne({ _id: new ObjectId(adId) });

    return ads;
  } finally {
    await client.close();
  }
};

const insertAd = async (adData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db
      .collection("ads")
      .insertOne({
        ...adData,
        createdAt: new Date(),
        updatedAt: new Date(),
        rating: { average: null, count: 0 },
      });

    return result.insertedId;
  } finally {
    await client.close();
  }
};

const updateAd = async (adId, adData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db
      .collection("ads")
      .updateOne(
        { _id: new ObjectId(adId) },
        { $set: { ...adData, updatedAt: new Date() } }
      );
  } finally {
    await client.close();
  }
};

const deleteAdById = async (adId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("ads").deleteOne({ _id: new ObjectId(adId) });
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllAds,
  getAdById,
  insertAd,
  updateAd,
  deleteAdById,
};
