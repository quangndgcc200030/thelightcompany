class CheckoutController {
    cart(req, res) {
        res.render('checkout/cart')
    }

    buy(req, res) {
        res.render('checkout/buy')
    }
}
module.exports = new CheckoutController