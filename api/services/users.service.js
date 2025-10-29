const db = require("../database/db")

const getAllUsers = async () => {
    return await db.any("SELECT * FROM users ORDER BY id ASC");
}

const getOneUser = async (user_id) =>{
    return await db.one('SELECT * from users WHERE id = $1', user_id);
}

const postUser = async (userData) => {
        return await db.one(
            'INSERT INTO users(last_name, first_name, email, phone_number, role_id) VALUES(${last_name}, ${first_name}, ${email}, ${phone_number}, ${role_id}) RETURNING *',
            {
                last_name: userData.last_name,
                first_name: userData.first_name,
                email: userData.email,
                phone_number: userData.phone_number,
                role_id: userData.role_id
            }
        );
}

const updateUser = async (userData, user_id) => {
        return await db.one(
            'UPDATE users SET last_name=${last_name}, first_name=${first_name}, email=${email}, phone_number=${phone_number} WHERE id=${id} RETURNING *',
            {
                last_name: userData.last_name,
                first_name: userData.first_name,
                email: userData.email,
                phone_number: userData.phone_number,
                id: user_id
            }
        );
}


const deleteUser = async (user_id) => {
    try {
        const userToDelete = await db.oneOrNone(
                                'SELECT * FROM users WHERE id=${id}',
                                {id: user_id}
                            );

        if (!userToDelete) {
            throw(new Error("The user doesn't exist"))
        }
        await db.none(
            'DELETE FROM users WHERE id=${id}',
            {id: user_id}
        );
        return {"message": "user deleted"}
    } catch (e) {
        throw e
    }
}

module.exports = {
    getAllUsers,
    getOneUser,
    postUser,
    updateUser,
    deleteUser
}