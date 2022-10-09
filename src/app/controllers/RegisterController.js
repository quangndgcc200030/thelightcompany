const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    index(req, res) {
        res.render('register/register')
    }

    async auth(req, res) {
        try {
            const user = await User.register(req.body.username, req.body.telephone, req.body.email)
            if (user.rowCount == 1) {
                const conflicError = "User already exists or duplicates telephone or email"
                res.render('register/register', {
                    error: conflicError,
                    username: req.body.username,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    gender: req.body.gender,
                    birthdate: req.body.birthdate,
                    telephone: req.body.telephone,
                    email: req.body.email,
                    address: req.body.address
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(req.body.password, salt)

                User.create(req.body.username, hashed, req.body.firstname, req.body.lastname, req.body.gender, req.body.birthdate, req.body.telephone, req.body.email, req.body.address, false)
                    .then(data => res.redirect('/login'))
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('register/register', { error: conflicError })
                    });
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.render('register/register', { error: conflicError })
        }
    }
}
module.exports = new RegisterController