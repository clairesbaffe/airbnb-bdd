const express = require('express');
const router = express.Router();
const {
    get_all_users,
    get_one_user,
    post_one_user,
    update_user,
    delete_user,
    update_user_role
} = require("../controllers/users.controller")


router.get('/', get_all_users);
router.post('/', post_one_user);
router.get('/:user_id', get_one_user);
router.patch('/:user_id', update_user);
router.delete('/:user_id', delete_user);
router.patch('/role/:user_id/:role_id', update_user_role);

module.exports = router;