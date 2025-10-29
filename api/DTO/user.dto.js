const userDto = (user) => {
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phone_number
  };
};

const usersDto = (users) => users.map(userDto);

module.exports = {
  userDto,
  usersDto
};
