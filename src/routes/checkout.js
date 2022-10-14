const express = require("express")
const router = express.Router()
const checkoutController = require('../app/controllers/CheckoutController')

router.post('/cart/store', checkoutController.cartstore)
router.post('/buy/store', checkoutController.buystore)
router.post('/cart', checkoutController.cart)
router.get('/buy', checkoutController.buy)

module.exports = router