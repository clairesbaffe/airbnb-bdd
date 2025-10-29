const {
    getAllUsers,
    getOneUser,
    postUser
 } = require("../services/users.service");
const {
    usersDto,
    userDto
} = require("../DTO/response/user.dto");
const{
    createUserDto
} = require("../DTO/requests/user.dto");

const get_all_users = async (req, res) => {
  try {
    const users = await getAllUsers();
    const data = usersDto(users);
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
    const data = userDto(user);
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
    const data = userDto(user);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

module.exports = {
  get_all_users,
  get_one_user,
  post_one_user
};
