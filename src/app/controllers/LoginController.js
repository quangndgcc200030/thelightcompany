const bcrypt = require('bcrypt');
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
            //Get infor from form
            const username = req.body.username.trim()
            const password = req.body.password.trim()

            var user = await User.findUser(username)

            if (user.rowCount == 1) {
                const validPass = await bcrypt.compare(
                    password,
                    user.rows[0].password
                )
                if (validPass) {
                    req.session.loggedin = true
                    req.session.user = user.rows[0]
                    res.redirect('/')
                } else {
                    const conflicError = "Password is not correct"
                    res.render('login/login', { account: username, error: conflicError })
                }
            } else {
                const conflicError = "User is not exist"
                res.render('login/login', { account: username, error: conflicError })
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.render('login/login', { account: username, error: conflicError })
        }
    }
}
module.exports = new LoginController