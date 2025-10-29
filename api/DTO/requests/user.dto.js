const createUserDto = (data) => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.phone_number,
    role_id: data.role_id
  };
};


const updateUserDto = (data) => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone_number: data.phone_number
  };
};

module.exports = {
  createUserDto,
  updateUserDto
};
