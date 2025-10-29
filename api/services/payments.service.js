const db = require("../database/db")

const getAllPayments = async () => {
    return await db.any("SELECT * FROM payments ORDER BY id ASC");
}

const getOnePayment = async (user_id) =>{
    return await db.one('SELECT * from payments WHERE id = $1', user_id);
}

module.exports = {
    getAllPayments,
    getOnePayment
};
