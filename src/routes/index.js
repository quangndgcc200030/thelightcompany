const siteRouter = require('./site')
const registerRouter = require('./register')
const loginRouter = require('./login')
const profileRouter = require('./profile')
const categoryRouter = require('./category')
const supplierRouter = require('./supplier')
const productRouter = require('./product')

function route(app) {
    app.use('/product', productRouter)
    app.use('/supplier', supplierRouter)
    app.use('/category', categoryRouter)
    app.use('/profile', profileRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/', siteRouter)
}

module.exports = route;