const db = require("../database/db")

const getAllContracts = async () => {
    return await db.any("SELECT * FROM contracts ORDER BY id ASC");
}

const getOneContract = async (contract_id) =>{
    return await db.one('SELECT * from contracts WHERE id = $1', contract_id);
}

const getAdContracts = async (ad_id) =>{
    return await db.any('SELECT * from contracts WHERE ad_id = $1', ad_id);
}


const postContract = async (contractData) => {
        return await db.one(
            'INSERT INTO contracts(date, content, ad_id, contractor_user_id, client_user_id) VALUES(${date}, ${content}, ${ad_id}, ${contractor_user_id}, ${client_user_id}) RETURNING *',
            {
                date: contractData.date,
                content: contractData.content,
                ad_id: contractData.ad_id,
                contractor_user_id: contractData.contractor_user_id,
                client_user_id: contractData.client_user_id
            }
        );
}

const updateContract = async (contractData, contract_id) => {
        return await db.one(
            'UPDATE contracts SET date=${date}, content=${content}, ad_id=${ad_id}, contractor_user_id=${contractor_user_id}, client_user_id=${client_user_id} WHERE id=${id} RETURNING *',
            {
                date: contractData.date,
                content: contractData.content,
                ad_id: contractData.ad_id,
                contractor_user_id: contractData.contractor_user_id,
                client_user_id: contractData.client_user_id,
                id: contract_id
            }
        );
}


const deleteContract = async (contract_id) => {
    try {
        const contractToDelete = await db.oneOrNone(
                                'SELECT * FROM contracts WHERE id=${id}',
                                {id: contract_id}
                            );

        if (!contractToDelete) {
            throw(new Error("The contract doesn't exist"))
        }
        await db.none(
            'DELETE FROM contracts WHERE id=${id}',
            {id: contract_id}
        );
        return {"message": "contract deleted"}
    } catch (e) {
        throw e
    }
}


module.exports = {
    getAllContracts,
    getOneContract,
    postContract,
    updateContract,
    deleteContract,
    getAdContracts
};
