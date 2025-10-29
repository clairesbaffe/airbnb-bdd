const express = require('express');
const router = express.Router();
const {
    get_all_roles,
    get_one_role,
    post_one_role,
    update_role,
    delete_role,
    get_number_user_by_role
} = require("../controllers/roles.controller")


router.get('/', get_all_roles);
router.get('/count-users', get_number_user_by_role);
router.get('/:role_id', get_one_role);
router.post('/', post_one_role);
router.patch('/:role_id', update_role);
router.delete('/:role_id', delete_role);

module.exports = router;
