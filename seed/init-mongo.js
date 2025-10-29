db = db.getSiblingDB("airbnb");

// ========================================
// COLLECTION: ads
// ========================================
db.ads.insertMany([
  {
    _id: ObjectId("651a1fabc9a1d9337a123456"),
    userId: 3, // Chloe Durand
    title: "Appartement T3 centre-ville",
    description:
      "Charmant T3 situé en plein cœur de Bordeaux, idéal pour les familles ou les couples.",
    address: {
      country: "France",
      postcode: "33000",
      city: "Bordeaux",
      street: "1 rue du Truc",
      addressSupplement: "",
    },
    price: 219.99,
    currency: "EUR",
    specifications: {
      type: "home", // room or home
      offers: ["wifi", "kitchen", "fridge", "washing machine", "TV"],
      images: [
        "https://example.com/images/appartement-t3-1.jpg",
        "https://example.com/images/appartement-t3-2.jpg",
        "https://example.com/images/appartement-t3-3.jpg",
      ],
    },
    selfCheckin: true,
    rating: {
      average: 4.5,
      count: 2,
    },
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    _id: ObjectId("651a1fabcd12d9337a654321"),
    userId: 8, // Paul Girard
    title: "Studio étudiant proche université",
    description:
      "Petit studio fonctionnel à 10 minutes du campus universitaire. Idéal étudiant.",
    address: {
      country: "France",
      postcode: "44000",
      city: "Nantes",
      street: "12 avenue des Facultés",
      addressSupplement: "Bâtiment C, étage 2",
    },
    price: 120.0,
    currency: "EUR",
    specifications: {
      type: "room",
      offers: ["wifi", "desk", "microwave", "heating"],
      images: [
        "https://example.com/images/studio-1.jpg",
        "https://example.com/images/studio-2.jpg",
      ],
    },
    selfCheckin: false,
    rating: {
      average: 4.2,
      count: 5,
    },
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-11"),
  },
  {
    _id: ObjectId("651b2fabc9a1d9337a999999"),
    userId: 3, // Host : Chloe Durand
    title: "Maison familiale avec jardin",
    description:
      "Grande maison avec 4 chambres et un grand jardin, parfaite pour les séjours en famille.",
    address: {
      country: "France",
      postcode: "75012",
      city: "Paris",
      street: "22 rue des Lilas",
      addressSupplement: "",
    },
    price: 320.5,
    currency: "EUR",
    specifications: {
      type: "home",
      offers: ["wifi", "garden", "parking", "BBQ", "TV", "dishwasher"],
      images: [
        "https://example.com/images/maison-1.jpg",
        "https://example.com/images/maison-2.jpg",
        "https://example.com/images/maison-3.jpg",
      ],
    },
    selfCheckin: true,
    rating: {
      average: 4.8,
      count: 12,
    },
    createdAt: new Date("2024-04-20"),
    updatedAt: new Date("2024-05-01"),
  },
  {
    _id: ObjectId("651b3fabcd12d9337a777777"),
    userId: 9, // Camille Rousseau
    title: "Chambre chez l’habitant à Lyon",
    description:
      "Petite chambre privée dans un appartement partagé avec le propriétaire.",
    address: {
      country: "France",
      postcode: "69003",
      city: "Lyon",
      street: "8 rue Garibaldi",
      addressSupplement: "Appartement 3B",
    },
    price: 65.0,
    currency: "EUR",
    specifications: {
      type: "room",
      offers: ["wifi", "shared bathroom", "heating"],
      images: [
        "https://example.com/images/chambre-1.jpg",
        "https://example.com/images/chambre-2.jpg",
      ],
    },
    selfCheckin: false,
    rating: {
      average: 4.0,
      count: 3,
    },
    createdAt: new Date("2024-06-05"),
    updatedAt: new Date("2024-06-10"),
  },
]);

// ========================================
// COLLECTION: comments
// ========================================
db.comments.insertMany([
  {
    userId: 6, // Lucas Bernard
    adId: ObjectId("651a1fabc9a1d9337a123456"), // Appartement T3 centre-ville
    comment:
      "Super séjour à Bordeaux ! L’appartement était propre et bien situé, hôte très réactif.",
    rating: 4.5,
    date: new Date("2024-09-24"),
  },
  {
    userId: 7, // Sophie Moreau
    adId: ObjectId("651a1fabc9a1d9337a123456"),
    comment:
      "Logement agréable et calme, parfait pour un week-end. Un peu de bruit le matin dans la rue.",
    rating: 4.0,
    date: new Date("2024-09-26"),
  },
  {
    userId: 7, // Sophie Moreau
    adId: ObjectId("651a1fabcd12d9337a654321"), // Studio étudiant proche université
    comment:
      "Studio bien équipé, parfait pour un court séjour. Un peu petit mais fonctionnel.",
    rating: 4.2,
    date: new Date("2024-10-03"),
  },
  {
    userId: 4, // David Petit
    adId: ObjectId("651b2fabc9a1d9337a999999"), // Maison familiale avec jardin
    comment:
      "Maison spacieuse, jardin très agréable. Idéal pour les enfants, on reviendra !",
    rating: 4.8,
    date: new Date("2024-07-15"),
  },
  {
    userId: 5, // Emma Lefevre
    adId: ObjectId("651b3fabcd12d9337a777777"), // Chambre chez l’habitant à Lyon
    comment:
      "Hôte sympathique, chambre conforme à la description. Très bon rapport qualité-prix.",
    rating: 4.3,
    date: new Date("2024-08-10"),
  },
]);

// ========================================
// COLLECTION: ratings
// ========================================
db.ratings.insertMany([
  {
    userId: 5, // Emma Lefevre
    adId: ObjectId("651a1fabc9a1d9337a123456"), // Appartement T3 centre-ville
    rating: 4.5,
    date: new Date("2024-09-26"),
  },
  {
    userId: 4, // David Petit
    adId: ObjectId("651a1fabcd12d9337a654321"), // Studio étudiant proche université
    rating: 4.0,
    date: new Date("2024-10-03"),
  },
  {
    userId: 5, // Emma Lefevre
    adId: ObjectId("651b2fabc9a1d9337a999999"), // Maison familiale avec jardin
    rating: 4.8,
    date: new Date("2024-07-18"),
  },
  {
    userId: 6, // Lucas Bernard
    adId: ObjectId("651b2fabc9a1d9337a999999"), // même annonce, autre note
    rating: 5.0,
    date: new Date("2024-07-20"),
  },
  {
    userId: 4, // David Petit
    adId: ObjectId("651b3fabcd12d9337a777777"), // Chambre chez l’habitant à Lyon
    rating: 4.0,
    date: new Date("2024-08-09"),
  },
]);
