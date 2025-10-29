const { getAllRatings } = require("../services/ratings.service");
const { ratingsDto } = require("../DTO/response/rating.dto");

const get_all_ratings = async (req, res) => {
  try {
    const ratings = await getAllRatings();
    const data = ratingsDto(ratings);
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_ratings,
};
