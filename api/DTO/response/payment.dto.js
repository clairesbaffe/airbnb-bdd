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

const currencyDto = (paymentCurrencies) => {
    return {
        currency: paymentCurrencies.currency,
        nb_payments: paymentCurrencies.nb_payments,
        total_amount: paymentCurrencies.total_amount,
        average_amount: paymentCurrencies.avg_amount
    }

}

const currenciesDto = (currencies) => currencies.map(currencyDto);

module.exports = {
  paymentDto,
  currenciesDto
};
