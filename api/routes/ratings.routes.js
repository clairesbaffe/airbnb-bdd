const express = require("express");
const router = express.Router();
const { get_all_ratings } = require("../controllers/ratings.controller");

router.get("/", get_all_ratings);

module.exports = router;
