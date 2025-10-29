const { ObjectId } = require("../../database/mongo");

const insertRatingDto = (data) => {
  return {
    userId: data.userId,
    adId: new ObjectId(data.adId),
    rating: data.rating,
  };
};

module.exports = {
  insertRatingDto,
};
