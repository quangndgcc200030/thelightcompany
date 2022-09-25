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
            const user = await User.findUser(req.body.username)
            // const validPass = await bcrypt.compare(
            //     req.body.password,
            //     user[0].password
            // )

            // if (user && validPass) {
            //     res.status(200).json(user)
            // } else {
            //     res.status(500).json({ mgs: "Fail!" })
            // }
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = new LoginController