const express = require("express")
const router = express.Router()

const {paymentProduct, paymentProductSuccess, paymentProductFailure} = require("../functions/payment.func")

router.get("/payment/:productId", paymentProduct)
router.get("/payment/:productId/success", paymentProductSuccess)
router.get("/payment/:productId/:buyer/success", paymentProductSuccess)
router.get("/payment/:productId/failure", paymentProductFailure)

module.exports = router