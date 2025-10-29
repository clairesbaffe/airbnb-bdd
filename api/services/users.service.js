const db = require("../database/db")

const getAllUsers = () => {
    return db.any("SELECT * FROM users");
}

module.exports = {
    getAllUsers
}