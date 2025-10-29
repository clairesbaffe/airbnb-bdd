const {userDto} = require("./user.dto")

const paymentDto = (payment, user, user_paid) => {
  return {
    id: payment.id,
    total: payment.total,
    date: payment.date,
    status: payment.status,
    currency: payment.currency,
    user: userDto(user),
    user_paid: userDto(user_paid)
  };
};

module.exports = {
  paymentDto
};
