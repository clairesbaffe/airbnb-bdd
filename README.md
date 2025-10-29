## Membres du groupe

Nom/prénom : Saint-Marc Maimiti
Nom/prénom : Sbaffe Claire

---

### 1. Présentation du Projet

Décrivez votre application en 3-5 phrases : problématique, objectif et fonctionnalités principales.

### 2. Architecture PostgreSQL (Méthode Merise)

**MCD (Modèle Conceptuel de Données)**

![alt text](assets/mcd.png)

**MLD (Modèle Logique de Données)**

![mld](assets/mld.png)

OU

```
users(id, lastName, firstName, email, phoneNumber, role_id)
roles(id, name)
payments(id, total, date, status, currency, user_id, user_paid_id)
contracts(id, date, content, listing_id, contractor_user_id, client_user_id)
```

**MPD (Modèle Physique de Données)**

```sql
-- =======================================
-- TABLE: roles
-- =======================================
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- =======================================
-- TABLE: users
-- =======================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    last_name VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone_number VARCHAR(20),
    role_id INTEGER NOT NULL,
    CONSTRAINT fk_users_roles FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- =======================================
-- TABLE: payments
-- =======================================
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    total NUMERIC(10,2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(30) CHECK (status IN ('pending', 'completed', 'failed')),
    currency VARCHAR(10) DEFAULT 'EUR',
    user_id INTEGER NOT NULL,
    CONSTRAINT fk_payments_users FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- =======================================
-- TABLE: contracts
-- =======================================
CREATE TABLE contracts (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content TEXT,
    ad_id TEXT,
    contractor_user_id INTEGER NOT NULL,
    client_user_id INTEGER NOT NULL,
    CONSTRAINT fk_contracts_contractor FOREIGN KEY (contractor_user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_contracts_client FOREIGN KEY (client_user_id)
        REFERENCES users(id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

```

### 3. Architecture MongoDB

```js
// ========================================
// COLLECTION: ads
// ========================================
db.ads.insertMany([
  {
    _id: ObjectId("651a1fabc9a1d9337a123456"),
    userId: 3, // ref to PostgreSQL data
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
]);

// ========================================
// COLLECTION: comments
// ========================================
db.comments.insertMany([
  {
    userId: 6, // ref to PostgreSQL data
    adId: ObjectId("651a1fabc9a1d9337a123456"),
    comment:
      "Super séjour à Bordeaux ! L’appartement était propre et bien situé, hôte très réactif.",
    rating: 4.5,
    date: new Date("2024-09-24"),
  },
]);

// ========================================
// COLLECTION: ratings
// ========================================
db.ratings.insertMany([
  {
    userId: 5, // ref to PostgreSQL data
    adId: ObjectId("651a1fabc9a1d9337a123456"),
    rating: 4.5,
    date: new Date("2024-09-26"),
  },
]);
```

### 4. Justification des Choix Techniques

- **Répartition des données** : Quelles données en PostgreSQL ? Quelles données en MongoDB ? Pourquoi ?
- **Modélisation MongoDB** : Documents imbriqués ou références ? Justification
- **Relations inter-bases** : Comment les deux bases communiquent-elles ?

### 5. Exemples de Requêtes Complexes

**PostgreSQL**

```sql
SELECT
      u.id AS user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone_number,
      u.role_id,
      COUNT(c.id) AS total_contracts
    FROM users u
    LEFT JOIN contracts c
      ON u.id = c.client_user_id
    GROUP BY u.id, u.first_name, u.last_name, u.email
    ORDER BY total_contracts DESC
    LIMIT ${limit};
```

**MongoDB**

```javascript
const searchAds = async (offersCriteria, maxPrice) => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(dbName);

    let query = [];

    if (maxPrice) {
      query.push({ $match: { price: { $lt: Number(maxPrice) } } });
    }

    if (offersCriteria && offersCriteria.length > 0) {
      query.push({
        $match: { "specifications.offers": { $all: offersCriteria } },
      });
    }

    const ads = await db.collection("ads").aggregate(query).toArray();

    return ads;
  } finally {
    await client.close();
  }
};
```

### 6. Stratégie de Sauvegarde

Pour cette partie, vous devez effectuer des recherches afin d'argumenter vos réponses.

- **PostgreSQL** : pg_dump peut être utilisé pour dump un fichier sql, il est facile d'utilisation mais devient plus lent sur de plus grosses bases. Il est préférable d'utiliser pg_dump sur des environnements de développement. Pour la production, on peut utiliser pg_basebackup qui va faire du PITR (point in time recovery), il va faire une copie du cluster à un instant T, puis on pourra revenir à cet état en cas de problème. On peut également utiliser du WAL (write ahead log) qui fait en sorte que chaque requête soit mise en log avant d'être effectuée, ainsi on aura que c'est la dernière requête insérée dans les logs qui a fait planter le cluster ou la base. En cas de panne, on peut rejouer ces logs pour restaurer la base à un état précis, juste avant l’incident.

- **MongoDB** : Les dump de BSON sont la procédure la plus simple mais c'est surtout utilisable sur de petites bases ou simplement pour de la restauration d'objets. On peut également faire des réplicas de la base nous aurons ainsi au moins deux instances de la base, faisant que si la base principale tombe, on peut faire du PITR en utilisant la base répliquée. Les solutions comme MongoDB Atlas permettent aussi des sauvegardes continues et la restauration PITR grâce à l’exploitation de l’oplog (journal des opérations).

- **Fréquence** : Dans le cas de la production, il est préférable de faire des sauvegardes complètes hebdomadaires voire quotidiennes selon la taille de la base, afin de ne risquer aucune perte de données accidentelle ou malveillante. Dans le cas de l'environnement de développement, on peut faire des sauvegardes moins fréquentes, incrémentales ou décrémentielles (avec l'outil pgBackRest par exemple), elles permettent de réduire l’espace disque et le temps de sauvegarde. Dans le cas de réplicas sur MongoDB, les données sont sauvegardées quasiment instantanément. Il est tout de même préférable de faire des dump réguliers.

- **Restauration** :
Pour pgsql, on peut tout simplement restaurer une sauvegarde avec un fichier sql issu d'un `pg_dump` avec la commande `pg_restore` dans une nouvelle base vide. Pour faire du PITR, on peut rejouer les fichiers WAL, des fichiers logs des requêtes effectuées.
Pour MongoDB, on peut faire la commande `mongorestore` qui va restaurer la base à partir d'un fichier dump en BSON. Dans le cas d'un réplica set, si un noeud tombe, le système bascule directement et automatiquement sur un autre noeud, on pourra donc restaurer le noeud en panne avec les dump effectués sans avoir de coupure. Enfin, on peut également faire du PITR en rejouant le fichier de logs oplog qui remettra la base dans l'état avant sa panne


