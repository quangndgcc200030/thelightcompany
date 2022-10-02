const siteRouter = require('./site')
const registerRouter = require('./register')
const loginRouter = require('./login')
const profileRouter = require('./profile')
const categoryRouter = require('./category')
const supplierRouter = require('./supplier')
const productRouter = require('./product')
const shopRouter = require('./shop')

function route(app) {
    app.use('/manage/shop', shopRouter)
    app.use('/manage/product', productRouter)
    app.use('/manage/supplier', supplierRouter)
    app.use('/manage/category', categoryRouter)
    app.use('/profile', profileRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/', siteRouter)
}

module.exports = route;