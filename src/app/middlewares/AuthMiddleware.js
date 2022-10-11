class AuthMiddleware {
    loggedin(req, res, next) {
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
            res.render('home')
        } else {
            next()
        }
    }

    freedom(req, res, next) {
        if (req.session.loggedin) {
            res.locals.user = req.session.user
            next()
        } else {
            next()
        }
    }

    admin(req, res, next) {
        if (req.session.loggedin && req.session.user.role) {
            res.locals.user = req.session.user
            next()
        } else {
            res.render('home')
        }
    }
}
module.exports = new AuthMiddleware