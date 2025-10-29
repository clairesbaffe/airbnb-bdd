const requestContractDto = (data) => {
  return {
    date: data.date,
    content: data.content,
    ad_id: data.ad_id,
    contractor_user_id: data.contractor_user_id,
    client_user_id: data.client_user_id
  };
};


module.exports = {
  requestContractDto
};
