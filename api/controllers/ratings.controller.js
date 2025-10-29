const { getAllRatings, getRatingById } = require("../services/ratings.service");
const { ratingsDto, ratingDto } = require("../DTO/response/rating.dto");

const get_all_ratings = async (req, res) => {
  try {
    const ratings = await getAllRatings();
    const data = ratingsDto(ratings);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const get_rating_by_id = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const rating = await getRatingById(ratingId);
    const data = ratingDto(rating);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_ratings,
  get_rating_by_id,
};
