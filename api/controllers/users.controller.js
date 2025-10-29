const {
    getAllUsers,
    getOneUser,
    postUser,
    updateUser,
    deleteUser,
    updateUserRole,
    getTopUsersContracts,
    getTopUsersClients
 } = require("../services/users.service");
const {
    userDto,
    userCountContractDto
} = require("../DTO/response/user.dto");
const {getOneRole} = require("../services/roles.service");
const{
    createUserDto,
    updateUserDto
} = require("../DTO/requests/user.dto");

const get_all_users = async (req, res) => {
  try {
    const users = await getAllUsers();
    const data = [];
    for (const user of users) {
        const role = await getOneRole(user.role_id);
        data.push(
            userDto(user, role)
        )
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const get_one_user = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const user = await getOneUser(user_id);
    const role = await getOneRole(user.role_id);
    const data = userDto(user, role);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const post_one_user = async (req, res) => {
  try {
    const userData = createUserDto(req.body);
    const newUser = await postUser(userData)
    const user = await getOneUser(newUser.id);
    const role = await getOneRole(user.role_id);
    const data = userDto(user, role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const update_user = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const userData = updateUserDto(req.body);
    const updatedUser = await updateUser(userData, user_id)
    const user = await getOneUser(updatedUser.id);
    const role = await getOneRole(user.role_id);
    const data = userDto(user, role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const update_user_role = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const role_id = parseInt(req.params.role_id);
    const updatedUser = await updateUserRole(role_id, user_id)
    const user = await getOneUser(updatedUser.id);
    const role = await getOneRole(user.role_id);
    const data = userDto(user, role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const delete_user = async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id);
    const deletedUser = await deleteUser(user_id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message});
  }
};


const get_top_users_contract = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const users = await getTopUsersContracts(limit);
    const data = [];
    for (const user of users) {
        const role = await getOneRole(user.role_id);
        data.push(
            userCountContractDto(user, role)
        )
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const get_top_users_client = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const users = await getTopUsersClients(limit);
    const data = [];
    for (const user of users) {
        const role = await getOneRole(user.role_id);
        data.push(
            userCountContractDto(user, role)
        )
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


module.exports = {
  get_all_users,
  get_one_user,
  post_one_user,
  update_user,
  delete_user,
  update_user_role,
  get_top_users_contract,
  get_top_users_client
};
