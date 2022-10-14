const { Cart } = require("../models/Cart")
const { CartDetail } = require("../models/CartDetail")
const { Product } = require("../models/Product")

class CartController {
    async index(req, res) {
        const user = req.session.user
        const cart = await Cart.showCart(user.username)
        if (cart.rowCount == 1) {
            const cartDetails = await CartDetail.showCartDetail(cart.rows[0].id)
            res.render('site/cart', {
                cart: cart.rows[0],
                cartDetails: cartDetails.rows
            })
        } else {
            res.render('site/cart')
        }
    }

    async add(req, res) {
        // Get all information
        const user = req.session.user
        let id = req.body.proid
        let quantity = parseInt(req.body.quantity)
        const product = await Product.viewDetail(id)
        const cart = await Cart.findByUsername(user.username)

        // console.log(cart)
        // Check whether or not the cart has exists
        if (cart.rowCount == 0) {
            const addCart = await Cart.add(product.rows[0].price * quantity, user.username)
            CartDetail.add(addCart.rows[0].id, product.rows[0].id, quantity, product.rows[0].price * quantity)
                .then(data => {
                    const success = "Add to cart successfully"
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
        } else {
            let flag = true;
            const cartDetailTemp = await CartDetail.find(cart.rows[0].id)
            cartDetailTemp.rows.forEach(async cartDetail => {
                if (cartDetail.product_id == product.rows[0].id) {
                    flag = false
                    let newQty = cartDetail.quantity + quantity
                    //check whether or not the purchase quantity is greater than the inventory quantity
                    if (newQty > product.rows[0].quantity) {
                        const showCart = await Cart.showCart(user.username)
                        const showCartDetails = await CartDetail.showCartDetail(cart.rows[0].id)
                        const conflicError = "The purchase quantity is greater than the inventory quantity"
                        return res.render('site/cart', {
                            cart: showCart.rows[0],
                            cartDetails: showCartDetails.rows,
                            error: conflicError
                        })
                    } else {
                        //Update product existed
                        const updateCartDetail = await CartDetail.update(cartDetail.cart_id, cartDetail.product_id, newQty, newQty * product.rows[0].price)
                        // Update total price of cart
                        Cart.update(updateCartDetail.rows[0].cart_id, cart.rows[0].total_price + (quantity * product.rows[0].price), user.username)
                            .then(data => {
                                const success = "Add to cart successfully"
                                res.render('site/viewdetail', {
                                    product: product.rows[0],
                                    success: success
                                })
                            })
                            .catch(err => {
                                const conflicError = "Something is error"
                                res.render('site/viewdetail', {
                                    product: product.rows[0],
                                    error: conflicError
                                })
                            })
                    }
                }
            })
            if (flag) {
                // Add new cart detail
                const addCartDetail = await CartDetail.add(cart.rows[0].id, product.rows[0].id, quantity, product.rows[0].price * quantity)
                Cart.update(cart.rows[0].id, cart.rows[0].total_price + addCartDetail.rows[0].total_price, user.username)
                    .then(data => {
                        //Update total price of cart
                        const success = "Add to cart successfully"
                        res.render('site/viewdetail', {
                            product: product.rows[0],
                            success: success
                        })
                    })
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('site/viewdetail', {
                            product: product.rows[0],
                            error: conflicError
                        })
                    })
            }
        }
    }

    async remove(req, res) {
        try {
            const user = req.session.user
            let cart_id = req.query.cart
            let product_id = req.query.product
            const cart = await Cart.find(cart_id)
            const cartDetail = await CartDetail.findOne(cart_id, product_id)

            const removeProduct = await CartDetail.remove(cart_id, product_id)
            Cart.update(cart_id, cart.rows[0].total_price - cartDetail.rows[0].total_price, user.username)
                .then(data => {
                    res.redirect('/cart')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('site/cart', {
                        error: conflicError
                    })
                })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('site/cart', {
                error: conflicError
            })
        }
    }

    async clear(req, res) {
        try {
            let cart_id = req.params.id
            Cart.deleteCart(cart_id)
                .then(data => {
                    res.redirect('/cart')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('site/cart', {
                        error: conflicError
                    })
                })
            // console.log(cart_id)
        } catch (error) {
            const conflicError = "Something is error"
            res.render('site/cart', {
                error: conflicError
            })
        }
    }
}
module.exports = new CartController