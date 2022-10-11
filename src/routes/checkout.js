const express = require("express")
const router = express.Router()
const checkoutController = require('../app/controllers/CheckoutController')

router.get('/cart', checkoutController.cart)
router.get('/buy', checkoutController.buy)

module.exports = router