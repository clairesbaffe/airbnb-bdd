const express = require('express');
const router = express.Router();
const {
    get_all_payments,
    get_one_payment
} = require("../controllers/payments.controller")


router.get('/', get_all_payments);
router.get('/:payment_id', get_one_payment);

module.exports = router;
