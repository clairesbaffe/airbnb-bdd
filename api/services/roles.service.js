const db = require("../database/db")

const getAllRoles = async () => {
    return await db.any("SELECT * FROM roles ORDER BY id ASC");
}

const getOneRole = async (role_id) =>{
    return await db.one('SELECT * from roles WHERE id = $1', role_id);
}

const postRole = async (roleData) => {
        return await db.one(
            'INSERT INTO roles(name) VALUES(${name}) RETURNING *',
            {
                name: roleData.name
            }
        );
}

const updateRole = async (roleData, role_id) => {
        return await db.one(
            'UPDATE roles SET name=${name} WHERE id=${id} RETURNING *',
            {
                name: roleData.name,
                id: role_id
            }
        );
}


const deleteRole = async (role_id) => {
    try {
        const roleToDelete = await db.oneOrNone(
                                'SELECT * FROM roles WHERE id=${id}',
                                {id: role_id}
                            );

        if (!roleToDelete) {
            throw(new Error("The role doesn't exist"))
        }
        await db.none(
            'DELETE FROM roles WHERE id=${id}',
            {id: role_id}
        );
        return {"message": "role deleted"}
    } catch (e) {
        throw e
    }
}

module.exports = {
    getAllRoles,
    getOneRole,
    postRole,
    updateRole,
    deleteRole
}
