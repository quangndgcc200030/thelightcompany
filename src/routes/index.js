const siteRouter = require('./site')
const registerRouter = require('./register')
const loginRouter = require('./login')
const profileRouter = require('./profile')
const categoryRouter = require('./category')
const supplierRouter = require('./supplier')
const productRouter = require('./product')
const shopRouter = require('./shop')
const cartRouter = require('./cart')
const authMiddleware = require('../app/middlewares/AuthMiddleware')

function route(app) {
    app.use('/manage/shop', authMiddleware.loggedin, shopRouter)
    app.use('/manage/product', authMiddleware.loggedin, productRouter)
    app.use('/manage/supplier', authMiddleware.loggedin, supplierRouter)
    app.use('/manage/category', authMiddleware.loggedin, categoryRouter)
    app.use('/profile', authMiddleware.loggedin, profileRouter)
    app.use('/login', authMiddleware.isAuth, loginRouter)
    app.use('/register', authMiddleware.isAuth, registerRouter)
    app.use('/cart', authMiddleware.loggedin, cartRouter)
    app.use('/', siteRouter)
}

module.exports = route;