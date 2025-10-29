const {
getAllRoles,
getOneRole
 } = require("../services/roles.service");

 const {
    roleDto,
    rolesDto
 } = require("../DTO/response/role.dto")


const get_all_roles = async (req, res) => {
  try {
    const roles = await getAllRoles();
    const data = rolesDto(roles);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const get_one_role = async (req, res) => {
  try {
    const role_id = parseInt(req.params.role_id);
    const role = await getOneRole(role_id);
    const data = roleDto(role);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


module.exports = {
    get_all_roles,
    get_one_role
}
