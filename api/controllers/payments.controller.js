const {
    getAllPayments,
    getOnePayment
 } = require("../services/payments.service");
 const {getOneUser} = require("../services/users.service");

 const {
    paymentDto,
    paymentsDto
 } = require("../DTO/response/payment.dto")


const get_all_payments = async (req, res) => {
  try {
    const payments = await getAllPayments();
    const data = paymentsDto(payments);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const get_one_payment = async (req, res) => {
  try {
    const payment_id = parseInt(req.params.payment_id);
    const payment = await getOnePayment(payment_id);
    const user = await getOneUser(payment.user_id);
    const userPaid = await getOneUser(payment.user_paid_id);
    const data = paymentDto(payment, user, userPaid);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
    get_all_payments,
    get_one_payment
}