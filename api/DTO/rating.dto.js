const ratingDto = (rating) => {
  return {
    id: rating._id,
    userId: rating.userId,
    adId: rating.adId,
    rating: rating.rating,
    date: rating.date,
  };
};

const ratingsDto = (ratings) => ratings.map(ratingDto);

module.exports = {
  ratingDto,
  ratingsDto,
};
