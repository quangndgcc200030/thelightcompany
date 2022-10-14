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

        }
    }


    async status(req, res) {
        try {
            let id = req.body.order_id
            let status = req.body.status

            if (status == 'false') {
                Order.changeStatus(id, true)
                    .then(data => res.redirect('/manage/order'))
                    .catch(err => res.json(err))
            } else {
                Order.changeStatus(id, false)
                    .then(data => res.redirect('/manage/order'))
                    .catch(err => res.json(err))
            }
        } catch (error) {
            res.json(error)
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
                    res.json(err)
                })
        } catch (error) {
            res.json(error)
        }
    }
}
module.exports = new OrderController