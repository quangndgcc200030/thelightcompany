const { Order } = require("../models/Order")
const { OrderDetail } = require("../models/OrderDetail")

class UserController {
    async index(req, res) {
        try {
            const user = req.session.user
            Order.showUserOrdered(user.username)
                .then(orders => {
                    res.render('userordered/list', {
                        userOrders: orders.rows
                    })
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('userordered/list', { error: conflicError })
                })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('userordered/list', { error: conflicError })
        }
    }

    async detail(req, res) {
        try {
            let id = req.params.id
            OrderDetail.showUserOrderedDetail(id)
                .then(orderDetails => {
                    res.render('userordered/detail', {
                        userOrderDetails: orderDetails.rows
                    })
                })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('userordered/list', { error: conflicError })
        }
    }
}
module.exports = new UserController