const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require("../models/User");

class LoginController {
    index(req, res) {
        res.render('login/login');
    }

    forgot(req, res) {
        res.render('login/forgotpassword');
    }

    async auth(req, res) {
        try {
            var user = await User.findUser(req.body.username)

            if (user.rowCount == 1) {
                const validPass = await bcrypt.compare(
                    req.body.password,
                    user.rows[0].password
                )
                if (validPass) {
                    req.session.loggedin = true
                    req.session.user = user.rows[0]
                    // console.log(req.session.user)
                    res.redirect('/')
                } else {
                    const conflicError = "Password is not correct"
                    res.render('login/login', { account: req.body.username, error: conflicError })
                }
            } else {
                const conflicError = "User is not exist"
                res.render('login/login', { account: req.body.username, error: conflicError })
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.render('login/login', { account: req.body.username, error: conflicError })
        }
    }
}
module.exports = new LoginController