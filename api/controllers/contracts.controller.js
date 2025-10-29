const {
    getAllContracts,
    getOneContract,
    postContract,
    updateContract,
    deleteContract
 } = require("../services/contracts.service");
const {getOneUser} = require("../services/users.service");
const {getOneRole} = require("../services/roles.service");
const {requestContractDto} = require("../DTO/requests/contracts.dto");
const { contractDto } = require("../DTO/response/contract.dto");


const get_all_contracts = async (req, res) => {
  try {
    const contracts = await getAllContracts();


    const data = [];
    for (const contract of contracts) {
        const contractor = await getOneUser(contract.contractor_user_id);
        const client = await getOneUser(contract.client_user_id);
        const contractor_role = await getOneRole(contractor.role_id);
        const client_role = await getOneRole(client.role_id);
        data.push(
            contractDto(contract, contractor, client, contractor_role, client_role)
        )
    };

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};



const get_one_contract = async (req, res) => {
  try {
    const contract_id = parseInt(req.params.contract_id);
    const contract = await getOneContract(contract_id);
    const contractor = await getOneUser(contract.contractor_user_id);
    const client = await getOneUser(contract.client_user_id);
    const contractor_role = await getOneRole(contractor.role_id);
    const client_role = await getOneRole(client.role_id);
    const data = contractDto(contract, contractor, client, contractor_role, client_role);
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const post_one_contract = async (req, res) => {
  try {
    const contractData = requestContractDto(req.body);
    const newContract = await postContract(contractData)
    const contract = await getOneContract(newContract.id);
    const contractor = await getOneUser(newContract.contractor_user_id);
    const client = await getOneUser(newContract.client_user_id);
    const contractor_role = await getOneRole(contractor.role_id);
    const client_role = await getOneRole(client.role_id);
    const data = contractDto(contract, contractor, client, contractor_role, client_role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const update_contract = async (req, res) => {
  try {
    const contract_id = parseInt(req.params.contract_id);
    const contractData = requestContractDto(req.body);
    const updatedContract = await updateContract(contractData, contract_id)
    const contract = await getOneContract(updatedContract.id);
    const contractor = await getOneUser(contract.contractor_user_id);
    const client = await getOneUser(contract.client_user_id);
    const contractor_role = await getOneRole(contractor.role_id);
    const client_role = await getOneRole(client.role_id);
    const data = contractDto(contract, contractor, client, contractor_role, client_role);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};


const delete_contract = async (req, res) => {
  try {
    const contract_id = parseInt(req.params.contract_id);
    const deletedContract = await deleteContract(contract_id);
    res.status(200).json(deletedContract);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: error.message});
  }
};

module.exports = {
    get_all_contracts,
    get_one_contract,
    post_one_contract,
    update_contract,
    delete_contract
}