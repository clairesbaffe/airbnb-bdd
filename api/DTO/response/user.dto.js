const {roleDto} = require("./role.dto")

const userDto = (user, role) => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.lastName,
    email: user.email,
    phone_number: user.phone_number,
    role: roleDto(role)
  };
};


const userCountContractDto = (user, role) => {
  return {
    id: user.user_id,
    first_name: user.first_name,
    last_name: user.lastName,
    email: user.email,
    phone_number: user.phone_number,
    role: roleDto(role),
    count: user.total_contracts
  };
};

module.exports = {
  userDto,
  userCountContractDto
};
