const {
  getAllRatings,
  getRatingById,
  insertRating,
  updateRating,
  deleteRatingById,
} = require("../services/ratings.service");
const { ratingsDto, ratingDto } = require("../DTO/response/rating.dto");
const {
  insertRatingDto,
  updateRatingDto,
} = require("../DTO/requests/rating.dto");

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

const insert_rating = async (req, res) => {
  try {
    const ratingData = insertRatingDto(req.body);

    const insertedId = await insertRating(ratingData);
    const rating = await getRatingById(insertedId);

    const data = ratingDto(rating);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const update_rating = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    const ratingData = updateRatingDto(req.body);

    await updateRating(ratingId, ratingData);
    const rating = await getRatingById(ratingId);

    const data = ratingDto(rating);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const delete_rating_by_id = async (req, res) => {
  try {
    const ratingId = req.params.ratingId;
    await deleteRatingById(ratingId);
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_ratings,
  get_rating_by_id,
  insert_rating,
  update_rating,
  delete_rating_by_id,
};
