const { Order } = require("../models/Order")
const { OrderDetail } = require("../models/OrderDetail")

class OrderController {
    async index(req, res) {
        try {
            const orders = await Order.showAllOrders()
            res.render('order/list', {
                orders: orders.rows
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('order/list', {
                error: conflicError
            })
        }
    }

    async detail(req, res) {
        try {
            let id = req.params.id
            const orderDetails = await OrderDetail.showAllOrderDetail(id)
            res.render('order/detail', {
                orderDetails: orderDetails.rows
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('order/list', {
                error: conflicError
            })
        }
    }


    async status(req, res) {
        try {
            let id = req.body.order_id
            let status = req.body.status

            if (status == 'false') {
                Order.changeStatus(id, true)
                    .then(data => res.redirect('/manage/order'))
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('order/list', {
                            error: conflicError
                        })
                    })
            } else {
                Order.changeStatus(id, false)
                    .then(data => res.redirect('/manage/order'))
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('order/list', {
                            error: conflicError
                        })
                    })
            }
        } catch (error) {
            const conflicError = "Something is error"
            res.render('order/list', {
                error: conflicError
            })
        }
    }

    async delete(req, res) {
        try {
            let id = req.params.id
            Order.delete(id)
                .then(data => {
                    res.redirect('/manage/order')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('order/list', {
                        error: conflicError
                    })
                })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('order/list', {
                error: conflicError
            })
        }
    }
}
module.exports = new OrderController