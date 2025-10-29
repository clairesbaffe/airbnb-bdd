const adDto = (ad) => {
  return {
    id: ad._id,
    userId: ad.userId,
    title: ad.title,
    description: ad.description,
    address: {
      country: ad.address.country,
      postcode: ad.address.postcode,
      city: ad.address.city,
      street: ad.address.street,
      addressSupplement: ad.address.addressSupplement,
    },
    price: ad.price,
    currency: ad.currency,
    specifications: {
      type: ad.specifications.type,
      offers: ad.specifications.offers,
      images: ad.specifications.images,
    },
    selfCheckin: ad.selfCheckin,
    rating: {
      average: ad.rating.average,
      count: ad.rating.count,
    },
    createdAt: ad.createdAt,
    updatedAt: ad.updatedAt,
  };
};

const adsDto = (ads) => ads.map(adDto);

module.exports = {
  adDto,
  adsDto,
};
