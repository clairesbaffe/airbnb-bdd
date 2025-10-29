const express = require("express");
const router = express.Router();

const {
  get_all_ads,
  get_ad_by_id,
  insert_ad,
  update_ad,
  delete_ad_by_id,
  add_offer,
  remove_offer,
} = require("../controllers/ads.controller");

router.get("/", get_all_ads);
router.get("/:adId", get_ad_by_id);
router.post("/", insert_ad);
router.patch("/:adId", update_ad);
router.delete("/:adId", delete_ad_by_id);
router.put("/offers/:adId", add_offer);
router.delete("/offers/:adId", remove_offer);

module.exports = router;
