const {getAllUsers} = require("../services/users.service")

const get_all_users = async (req, res) => {
    try {
        const festivals = await getAllUsers();
        res.status(200).json(festivals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur serveur" });
    }
};

module.exports = {
    get_all_users
}