const {
  getAllAds,
  getAdById,
  insertAd,
  updateAd,
  deleteAdById,
  addOffer,
  removeOffer,
  searchAds,
} = require("../services/ads.service");
const { adsDto, adDto } = require("../DTO/response/ad.dto");
const { insertAdDto, updateAdDto } = require("../DTO/requests/ad.dto");

const get_all_ads = async (req, res) => {
  try {
    const ads = await getAllAds();
    const data = adsDto(ads);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const search_ads = async (req, res) => {
  try {
    const offersCriteria = req.query.offersCriteria;
    const maxPrice = req.query.maxPrice;

    const ads = await searchAds(
      offersCriteria ? offersCriteria.split(",") : null,
      maxPrice
    );
    const data = adsDto(ads);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const get_ad_by_id = async (req, res) => {
  try {
    const adId = req.params.adId;
    const ad = await getAdById(adId);
    const data = adDto(ad);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const insert_ad = async (req, res) => {
  try {
    const adData = insertAdDto(req.body);

    const insertedId = await insertAd(adData);
    const ad = await getAdById(insertedId);

    const data = adDto(ad);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const update_ad = async (req, res) => {
  try {
    const adId = req.params.adId;
    const adData = updateAdDto(req.body);

    await updateAd(adId, adData);
    const ad = await getAdById(adId);

    const data = adDto(ad);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const delete_ad_by_id = async (req, res) => {
  try {
    const adId = req.params.adId;
    await deleteAdById(adId);
    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const add_offer = async (req, res) => {
  try {
    const adId = req.params.adId;
    const offer = req.query.offer;

    await addOffer(adId, offer);

    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

const remove_offer = async (req, res) => {
  try {
    const adId = req.params.adId;
    const offer = req.query.offer;

    await removeOffer(adId, offer);

    res.status(200).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_ads,
  get_ad_by_id,
  insert_ad,
  update_ad,
  delete_ad_by_id,
  add_offer,
  remove_offer,
  search_ads,
};
