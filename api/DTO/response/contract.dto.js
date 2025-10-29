const {userDto} = require("./user.dto")

const contractDto = (contract, contractor_user, client_user) => {
  return {
    id: contract.id,
    date: contract.date,
    content: contract.content,
    ad_id: contract.ad_id,
    contractor_user: userDto(contractor_user),
    client_user: userDto(client_user)
  };
};

module.exports = {
  contractDto
};
