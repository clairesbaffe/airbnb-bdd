const db = require("../database/db")

const getAllPayments = async () => {
    return await db.any("SELECT * FROM payments ORDER BY id ASC");
}

const getOnePayment = async (user_id) =>{
    return await db.one('SELECT * from payments WHERE id = $1', user_id);
}


const postPayment = async (paymentData) => {
        return await db.one(
            'INSERT INTO payments(total, date, status, currency, user_id, user_paid_id) VALUES(${total}, ${date}, ${status}, ${currency}, ${user_id}, ${user_paid_id}) RETURNING *',
            {
                total: paymentData.total,
                date: paymentData.date,
                status: paymentData.status,
                currency: paymentData.currency,
                user_id: paymentData.user_id,
                user_paid_id: paymentData.user_paid_id
            }
        );
}

const updatePayment = async (paymentData, payment_id) => {
        return await db.one(
            'UPDATE payments SET total=${total}, date=${date}, status=${status}, currency=${currency} WHERE id=${id} RETURNING *',
            {
                total: paymentData.total,
                date: paymentData.date,
                status: paymentData.status,
                currency: paymentData.currency,
                id: payment_id
            }
        );
}

module.exports = {
    getAllPayments,
    getOnePayment,
    postPayment,
    updatePayment
};
