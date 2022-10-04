const bcrypt = require('bcrypt')
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
                    res.status(200).redirect('/')
                } else {
                    res.render('login/login', { error: "Password is not correct!" })
                }
            } else {
                res.render('login/login', { error: "Username is not found!" })
            }
        } catch (err) {
            res.redirect('/login')
        }
    }
}
module.exports = new LoginController