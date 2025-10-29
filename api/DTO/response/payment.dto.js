const {userDto} = require("./user.dto")

const paymentDto = (payment, user, user_paid, role, role_paid) => {
  return {
    id: payment.id,
    total: payment.total,
    date: payment.date,
    status: payment.status,
    currency: payment.currency,
    user: userDto(user, role),
    user_paid: userDto(user_paid, role_paid)
  };
};

module.exports = {
  paymentDto
};
