const {
    getAllUsers,
    getOneUser,
    postUser,
    updateUser,
    deleteUser
 } = require("../services/users.service");
const {userDto} = require("../DTO/response/user.dto");
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

module.exports = {
  get_all_users,
  get_one_user,
  post_one_user,
  update_user,
  delete_user
};
