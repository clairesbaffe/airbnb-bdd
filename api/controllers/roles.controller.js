const {
    getAllRoles,
    getOneRole,
    postRole,
    updateRole,
    deleteRole,
    getNumberUsersByRole
 } = require("../services/roles.service");

 const {
    roleDto,
    rolesDto
 } = require("../DTO/response/role.dto")
 const {requestRoleDto} = require("../DTO/requests/role.dto");


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


const post_one_role = async (req, res) => {
  try {
    const roleData = requestRoleDto(req.body);
    const newRole = await postRole(roleData)
    const role = await getOneRole(newRole.id);
    const data = roleDto(role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const update_role = async (req, res) => {
  try {
    const role_id = parseInt(req.params.role_id);
    const roleData = requestRoleDto(req.body);
    const updatedRole = await updateRole(roleData, role_id)
    const role = await getOneRole(updatedRole.id);
    const data = roleDto(role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const delete_role = async (req, res) => {
  try {
    const role_id = parseInt(req.params.role_id);
    const deletedRole = await deleteRole(role_id);
    res.status(200).json(deletedRole);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message});
  }
};


const get_number_user_by_role = async (req, res) => {
  try {
    const number = await getNumberUsersByRole();
    res.status(200).json(number);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
    get_all_roles,
    get_one_role,
    post_one_role,
    update_role,
    delete_role,
    get_number_user_by_role
}
