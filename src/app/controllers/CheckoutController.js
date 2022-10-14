const e = require("express")
const { Cart } = require("../models/Cart")
const { CartDetail } = require("../models/CartDetail")
const { Order } = require("../models/Order")
const { OrderDetail } = require("../models/OrderDetail")
const { Product } = require("../models/Product")

class CheckoutController {
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
        let product = await Product.viewDetail(product_id)
        try {
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
            Product.updateQuantity(product_id, product.rows[0].quantity - quantity)
                .then(async data => {
                    product = await Product.viewDetail(product_id)
                    const success = "Payment successfully"
                    res.render('site/viewdetail', {
                        product: product.rows[0],
                        success: success
                    })
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    return res.render('site/viewdetail', {
                        product: product.rows[0],
                        error: conflicError
                    })
                })
        } catch (error) {
            const conflicError = "Something is error"
            return res.render('site/viewdetail', {
                product: product.rows[0],
                error: conflicError
            })
        }
    }

    async cart(req, res) {
        //Get user information
        const user = req.session.user
        //Get fee shipping
        const fee_ship = parseFloat(req.body.shipping)
        //Get cart of user
        const cart = await Cart.showCart(user.username)
        if (cart.rowCount == 1) {
            //Get cart detail
            const cartDetail = await CartDetail.showCartDetail(cart.rows[0].id)
            //Total
            const total_price = cart.rows[0].total_price + fee_ship
            res.render('checkout/cart', {
                user: user,
                fee_ship: fee_ship,
                total_price: total_price,
                cart: cart.rows[0],
                cartDetail: cartDetail.rows
            })
        } else {
            res.render('site/cart')
        }
    }

    async cartstore(req, res) {
        try {
            //Get user information
            const user = req.session.user
            //Get information from form
            const recip_name = req.body.recip_name
            const telephone = req.body.telephone
            const address = req.body.address
            const fee_ship = parseFloat(req.body.shipping)
            //get cart
            const cart = await Cart.findByUsername(user.username)
            //Get cart detail
            const cartDetailTemp = await CartDetail.find(cart.rows[0].id)

            //add order
            const addOrder = await Order.add(address, recip_name, telephone, cart.rows[0].total_price + fee_ship, user.username)

            //add order detail
            cartDetailTemp.rows.forEach(async cartDetail => {
                OrderDetail.add(addOrder.rows[0].id, cartDetail.product_id, cartDetail.quantity, cartDetail.total_price)
                    .then(async data => {
                        //Update product quantity
                        let product = await Product.show(cartDetail.product_id)
                        const updateProduct = await Product.updateQuantity(product.rows[0].id, product.rows[0].quantity - cartDetail.quantity)
                    })
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('site/cart', {
                            error: conflicError
                        })
                    })
            });

            //clear cart
            const clearCart = await Cart.deleteCart(cart.rows[0].id)

            const success = "Payment successfully"
            res.render('site/cart', {
                success: success
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('site/cart', {
                error: conflicError
            })
        }
    }
}
module.exports = new CheckoutController