const router = require('express').Router(); 

const checkoutCntrlr = require('../controllers/checkoutCntrlr')

const auth = require('../middleware/auth');

router.route('/checkout')
        .post(auth, checkoutCntrlr.createCheckoutInfo)

module.exports = router