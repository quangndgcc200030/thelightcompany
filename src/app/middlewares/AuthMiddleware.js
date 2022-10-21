const { Product } = require("../models/Product");

class AuthMiddleware {
    async loggedin(req, res, next) {
        const products = await Product.get()
        var arr = []
        products.rows.forEach(item => {
            arr.push(item.name)
        })
        res.locals.searchProduct = arr

        if (req.session.loggedin) {
            res.locals.user = req.session.user
            next();
        } else {
            res.redirect('/login')
        }
    }

    isAuth(req, res, next) {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            res.redirect('/')
        } else {
            next()
        }
    }

    async freedom(req, res, next) {
        const products = await Product.get()
        var arr = []
        products.rows.forEach(item => {
            arr.push(item.name)
        })
        res.locals.searchProduct = arr

        if (req.session.loggedin) {
            res.locals.user = req.session.user
            next()
        } else {
            next()
        }
    }

    async admin(req, res, next) {
        const products = await Product.get()
        var arr = []
        products.rows.forEach(item => {
            arr.push(item.name)
        })
        res.locals.searchProduct = arr

        if (req.session.loggedin && req.session.user.role) {
            res.locals.user = req.session.user
            next()
        } else if (req.session.loggedin && !req.session.user.role) {
            res.locals.user = req.session.user
            res.redirect('/')
        } else {
            res.redirect('/login')
        }
    }
}
module.exports = new AuthMiddleware