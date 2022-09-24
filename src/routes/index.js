const siteRouter = require('./site')
const registerRouter = require('./register')
const loginRouter = require('./login')
const profileRouter = require('./profile')

function route(app) {
    app.use('/profile', profileRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/', siteRouter)
}

module.exports = route;