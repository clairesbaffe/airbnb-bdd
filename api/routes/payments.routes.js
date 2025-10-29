const express = require('express');
const router = express.Router();
const {
    get_all_payments,
    get_one_payment,
    post_one_payment,
    update_payment,
    delete_payment
} = require("../controllers/payments.controller")


router.get('/', get_all_payments);
router.get('/:payment_id', get_one_payment);
router.post('/', post_one_payment);
router.patch('/:payment_id', update_payment);
router.delete('/:payment_id', delete_payment);

module.exports = router;
