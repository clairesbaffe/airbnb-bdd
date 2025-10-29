const { getAllUsers } = require("../services/users.service");
const { usersDto } = require("../DTO/user.dto");

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

module.exports = {
  get_all_users
};
