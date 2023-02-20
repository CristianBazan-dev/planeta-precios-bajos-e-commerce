const router = require('express').Router() 

const paymentCntrlr = require('../controllers/paymentCntrlr'); 

const auth = require('../middleware/auth'); 
const authAdmin = require('../middleware/authAdmin'); 

router.route('/payment')
            .get(auth, authAdmin, paymentCntrlr.getPayments)
            .post(auth, paymentCntrlr.createPayment)

module.exports = router