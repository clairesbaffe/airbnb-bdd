const roleDto = (role) => {
  return {
    id: role.id,
    name: role.name
  };
};

const rolesDto = (roles) => roles.map(roleDto);

module.exports = {
  roleDto,
  rolesDto
};
