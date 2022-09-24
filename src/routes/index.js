const siteRouter = require('./site')
const registerRouter = require('./register')

function route(app) {
    app.use('/register', registerRouter)
    app.use('/', siteRouter)
}

module.exports = route;