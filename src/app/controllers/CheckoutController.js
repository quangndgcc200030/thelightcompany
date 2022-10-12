const e = require("express")
const { Order } = require("../models/Order")
const { OrderDetail } = require("../models/OrderDetail")
const { Product } = require("../models/Product")

class CheckoutController {
    cart(req, res) {
        res.render('checkout/cart')
    }

    async buy(req, res) {
        //Get user information
        const user = req.session.user
        //Get product's id
        const id = req.body.proid
        //Get quantity
        const quantity = req.body.quantity
        //Get product
        const product = await Product.show(id)
        //Get price
        const total_price = quantity * product.rows[0].price
        res.render('checkout/buy', {
            user: user,
            product: product.rows[0],
            quantity: quantity,
            total_price: total_price
        })
    }

    async buystore(req, res) {
        //Get user information
        const user = req.session.user
        //Get information from form
        const recip_name = req.body.recip_name
        const telephone = req.body.telephone
        const address = req.body.address
        const product_id = req.body.proid
        const quantity = parseInt(req.body.quantity)
        const total_price = parseFloat(req.body.totalprice)
        const fee_ship = parseFloat(req.body.shipping)

        //add order
        const addOrder = await Order.add(address, recip_name, telephone, total_price + fee_ship, user.username)
        //add order detail
        const addOrderDetail = await OrderDetail.add(addOrder.rows[0].id, product_id, quantity, total_price)
        //Update quantity
        var product = await Product.show(product_id)
        if (product.rowCount == 1) {
            Product.updateQuantity(product_id, product.rows[0].quantity - quantity)
                .then(async data => {
                    product = await Product.viewDetail(product_id)
                    const success = "Payment successfully"
                    res.render('site/viewdetail', {
                        product: product.rows[0],
                        success: success
                    })
                })
        } else {
            const conflicError = "Something is error"
            return res.render('site/viewdetail', {
                product: product.rows[0],
                error: conflicError
            })
        }
    }
}
module.exports = new CheckoutController