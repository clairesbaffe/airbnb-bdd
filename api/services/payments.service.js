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


const deletePayment = async (payment_id) => {
    try {
        const paymentToDelete = await db.oneOrNone(
                                'SELECT * FROM payments WHERE id=${id}',
                                {id: payment_id}
                            );

        if (!paymentToDelete) {
            throw(new Error("The payment doesn't exist"))
        }
        await db.none(
            'DELETE FROM payments WHERE id=${id}',
            {id: payment_id}
        );
        return {"message": "payment deleted"}
    } catch (e) {
        throw e
    }
}


const getPaymentsByCurrencies = async () => {
    return await db.any(`SELECT
                        currency,
                        COUNT(id) AS nb_payments,
                        SUM(total) AS total_amount,
                        AVG(total) AS avg_amount
                        FROM payments
                        GROUP BY currency
                        ORDER BY total_amount DESC;
                `);
}

module.exports = {
    getAllPayments,
    getOnePayment,
    postPayment,
    updatePayment,
    deletePayment,
    getPaymentsByCurrencies
};
