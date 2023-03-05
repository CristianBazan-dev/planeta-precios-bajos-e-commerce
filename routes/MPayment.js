const router = require("express").Router();

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const paymentCntrlr = require("../controllers/mPaymentCntrlr");

router
  .route("/payment")
  .get(auth, authAdmin, paymentCntrlr.getPayments)
  .post(auth, paymentCntrlr.createPayment)

router.route("/payment/:id")
  .post( paymentCntrlr.getPaymentLink);

module.exports = router;
