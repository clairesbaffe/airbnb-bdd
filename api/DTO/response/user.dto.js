const userDto = (user) => {
  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.lastName,
    email: user.email,
    phone_number: user.phone_number
  };
};

const usersDto = (users) => users.map(userDto);

module.exports = {
  userDto,
  usersDto
};
