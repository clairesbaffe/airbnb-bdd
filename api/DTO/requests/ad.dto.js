const insertAdDto = (data) => {
  return {
    userId: data.userId,
    title: data.title,
    description: data.description,
    address: {
      country: data.address.country,
      postcode: data.address.postcode,
      city: data.address.city,
      street: data.address.street,
      addressSupplement: data.address.addressSupplement,
    },
    price: data.price,
    currency: data.currency,
    specifications: {
      type: data.specifications.type,
      offers: data.specifications.offers,
      images: data.specifications.images,
    },
    selfCheckin: data.selfCheckin,
  };
};

const updateAdDto = (data) => {
  return {
    userId: data.userId,
    title: data.title,
    description: data.description,
    address: {
      country: data.address.country,
      postcode: data.address.postcode,
      city: data.address.city,
      street: data.address.street,
      addressSupplement: data.address.addressSupplement,
    },
    price: data.price,
    currency: data.currency,
    specifications: {
      type: data.specifications.type,
      offers: data.specifications.offers,
      images: data.specifications.images,
    },
    selfCheckin: data.selfCheckin,
    rating: {
      average: data.rating.average,
      count: data.rating.count,
    },
  };
};

module.exports = {
  insertAdDto,
  updateAdDto,
};
