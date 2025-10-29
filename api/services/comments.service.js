const {
  MongoClient,
  mongoUri,
  dbName,
  ObjectId,
} = require("../database/mongo");

const getAllComments = async () => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const comments = await db.collection("comments").find().toArray();

    return comments;
  } finally {
    await client.close();
  }
};

const getCommentById = async (commentId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const comments = await db
      .collection("comments")
      .findOne({ _id: new ObjectId(commentId) });

    return comments;
  } finally {
    await client.close();
  }
};

const insertComment = async (commentData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    const result = await db
      .collection("comments")
      .insertOne({ ...commentData, date: new Date() });

    return result.insertedId;
  } finally {
    await client.close();
  }
};

const updateComment = async (commentId, commentData) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db
      .collection("comments")
      .updateOne(
        { _id: new ObjectId(commentId) },
        { $set: { ...commentData } }
      );
  } finally {
    await client.close();
  }
};

const deleteCommentById = async (commentId) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("comments").deleteOne({ _id: new ObjectId(commentId) });
  } finally {
    await client.close();
  }
};

module.exports = {
  getAllComments,
  getCommentById,
  insertComment,
  updateComment,
  deleteCommentById,
};
