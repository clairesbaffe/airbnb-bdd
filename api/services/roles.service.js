const db = require("../database/db")

const getAllRoles = async () => {
    return await db.any("SELECT * FROM roles ORDER BY id ASC");
}

const getOneRole = async (role_id) =>{
    return await db.one('SELECT * from roles WHERE id = $1', role_id);
}

module.exports = {
    getAllRoles,
    getOneRole
}