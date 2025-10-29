const {
    getAllPayments,
    getOnePayment,
    postPayment,
    updatePayment,
    deletePayment
 } = require("../services/payments.service");
 const {getOneUser} = require("../services/users.service");

 const {paymentDto} = require("../DTO/response/payment.dto")
 const {
    createPaymentDto,
    updatePaymentDto
 } = require("../DTO/requests/payment.dto");


const get_all_payments = async (req, res) => {
  try {
    const payments = await getAllPayments();


    const data = [];
    for (const payment of payments) {
        const user = await getOneUser(payment.user_id);
        const userPaid = await getOneUser(payment.user_paid_id);
        data.push(
            paymentDto(payment, user, userPaid)
        )
    };

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


const post_one_payment = async (req, res) => {
  try {
    const paymentData = createPaymentDto(req.body);
    const newPayment = await postPayment(paymentData)
    const payment = await getOnePayment(newPayment.id);
    const user = await getOneUser(newPayment.user_id);
    const user_paid = await getOneUser(newPayment.user_paid_id);
    const data = paymentDto(payment, user, user_paid);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const update_payment = async (req, res) => {
  try {
    const payment_id = parseInt(req.params.payment_id);
    const paymentData = updatePaymentDto(req.body);
    const updatedPayment = await updatePayment(paymentData, payment_id)
    const payment = await getOnePayment(updatedPayment.id);
    const user = await getOneUser(updatedPayment.user_id);
    const user_paid = await getOneUser(updatedPayment.user_paid_id);
    const data = paymentDto(payment, user, user_paid);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const delete_payment = async (req, res) => {
  try {
    const payment_id = parseInt(req.params.payment_id);
    const deletedPayment = await deletePayment(payment_id);
    res.status(200).json(deletedPayment);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message});
  }
};

module.exports = {
    get_all_payments,
    get_one_payment,
    post_one_payment,
    update_payment,
    delete_payment
}