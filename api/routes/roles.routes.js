const express = require('express');
const router = express.Router();
const {
    get_all_roles,
    get_one_role
} = require("../controllers/roles.controller")


router.get('/', get_all_roles);
router.get('/:role_id', get_one_role);

module.exports = router;
