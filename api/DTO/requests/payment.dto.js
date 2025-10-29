const createPaymentDto = (data) => {
  return {
    id: data.id,
    total: data.total,
    date: data.date,
    status: data.status,
    currency: data.currency,
    user_id: data.user_id,
    user_paid_id: data.user_paid_id
  };
};


const updatePaymentDto = (data) => {
  return {
    id: data.id,
    total: data.total,
    date: data.date,
    status: data.status,
    currency: data.currency
  };
};

module.exports = {
  createPaymentDto,
  updatePaymentDto
};
