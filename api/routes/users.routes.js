const express = require('express');
const router = express.Router();
const {get_all_users} = require("../controllers/users.controller")


router.get('/', get_all_users);

module.exports = router;