
## Membres du groupe
Nom/prénom : Saint-Marc Maimiti
Nom/prénom : Sbaffe Claire

---

### 1. Présentation du Projet

Décrivez votre application en 3-5 phrases : problématique, objectif et fonctionnalités principales.

### 2. Architecture PostgreSQL (Méthode Merise)

**MCD (Modèle Conceptuel de Données)**

![mcd](assets/mcd.png)

**MLD (Modèle Logique de Données)**

![mld](assets/mld.png)

OU

```
users(id, lastName, firstName, email, phoneNumber, role_id)
roles(id, name)
payments(id, total, date, status, currency, user_id)
contracts(id, date, content, ad_id, contractor_user_id, client_user_id)
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

```json
// Exemple de structure de vos documents
```

### 4. Justification des Choix Techniques

- **Répartition des données** : Quelles données en PostgreSQL ? Quelles données en MongoDB ? Pourquoi ?
- **Modélisation MongoDB** : Documents imbriqués ou références ? Justification
- **Relations inter-bases** : Comment les deux bases communiquent-elles ?

### 5. Exemples de Requêtes Complexes

**PostgreSQL**

```sql
-- Exemple de requête avec jointure et agrégat
```

**MongoDB**

```javascript
// Exemple de pipeline d'agrégation
```

### 6. Stratégie de Sauvegarde
Pour cette partie, vous devez effectuer des recherches afin d'argumenter vos réponses.

- **PostgreSQL** : Méthode proposée (pg_dump, sauvegarde continue, etc.)
- **MongoDB** : Méthode proposée (mongodump, replica set, etc.)
- **Fréquence** : Complète, incrémentale, différentielle
- **Restauration** : Procédure en cas de perte de données