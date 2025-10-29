const express = require('express');
const router = express.Router();
const {
    get_all_contracts,
    get_one_contract,
    post_one_contract,
    update_contract,
    delete_contract,
    get_ad_contracts
} = require("../controllers/contracts.controller")


router.get('/', get_all_contracts);
router.post('/', post_one_contract);
router.get('/stats/ad/:ad_id', get_ad_contracts);
router.get('/:contract_id', get_one_contract);
router.patch('/:contract_id', update_contract);
router.delete('/:contract_id', delete_contract);

module.exports = router;
