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

const updateUserRole = async (role_id, user_id) => {
        return await db.one(
            'UPDATE users SET role_id=${role_id} WHERE id=${id} RETURNING *',
            {
                role_id: role_id,
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


const getTopUsersContracts = async (limit = 5) => {
  return await db.any(
    `
    SELECT
      u.id AS user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone_number,
      u.role_id,
      COUNT(c.id) AS total_contracts
    FROM users u
    LEFT JOIN contracts c
      ON u.id = c.contractor_user_id
    GROUP BY u.id, u.first_name, u.last_name, u.email
    ORDER BY total_contracts DESC
    LIMIT ${limit};
    `,
    {
        limit: limit
    }
  );
};



const getTopUsersClients = async (limit = 5) => {
  return await db.any(
    `
    SELECT
      u.id AS user_id,
      u.first_name,
      u.last_name,
      u.email,
      u.phone_number,
      u.role_id,
      COUNT(c.id) AS total_contracts
    FROM users u
    LEFT JOIN contracts c
      ON u.id = c.client_user_id
    GROUP BY u.id, u.first_name, u.last_name, u.email
    ORDER BY total_contracts DESC
    LIMIT ${limit};
    `,
    {
        limit: limit
    }
  );
};


module.exports = {
    getAllUsers,
    getOneUser,
    postUser,
    updateUser,
    deleteUser,
    updateUserRole,
    getTopUsersContracts,
    getTopUsersClients
}