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