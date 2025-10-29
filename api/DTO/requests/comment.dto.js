const { ObjectId } = require("../../database/mongo");

const insertCommentDto = (data) => {
  return {
    userId: data.userId,
    adId: new ObjectId(data.adId),
    comment: data.comment,
    rating: data.rating,
  };
};

const updateCommentDto = (data) => {
  return {
    comment: data.comment,
    rating: data.rating,
  };
};

module.exports = {
  insertCommentDto,
  updateCommentDto,
};
