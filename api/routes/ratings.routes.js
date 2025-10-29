const express = require("express");
const router = express.Router();

const {
  get_all_ratings,
  get_rating_by_id,
  insert_rating,
  update_rating,
  delete_rating_by_id,
} = require("../controllers/ratings.controller");

router.get("/", get_all_ratings);
router.get("/:ratingId", get_rating_by_id);
router.post("/", insert_rating);
router.patch("/:ratingId", update_rating);
router.delete("/:ratingId", delete_rating_by_id);

module.exports = router;
