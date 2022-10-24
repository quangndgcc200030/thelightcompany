const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    index(req, res) {
        res.render('register/register')
    }

    async auth(req, res) {
        try {
            const username = req.body.username.trim()
            const password = req.body.password.trim()
            const firstname = req.body.firstname.trim()
            const lastname = req.body.lastname.trim()
            const gender = req.body.gender
            const birthdate = req.body.birthdate
            const telephone = req.body.telephone
            const email = req.body.email
            const address = req.body.address.trim()

            const user = await User.checkRegister(username)
            if (user.rowCount == 1) {
                const conflicError = "User already exists!"
                res.render('register/register', {
                    error: conflicError,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                    gender: gender,
                    birthdate: birthdate,
                    telephone: telephone,
                    email: email,
                    address: address
                })
            } else {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(password, salt)

                User.create(username, hashed, firstname, lastname, gender, birthdate, telephone, email, address, false)
                    .then(data => {
                        res.render('register/register', {
                            status: "successfully"
                        })
                    })
                    .catch(err => {
                        const conflicError = "Something is error 1"
                        res.render('register/register', { error: conflicError })
                    });
            }
        } catch (err) {
            const conflicError = "Something is error 2"
            res.render('register/register', { error: conflicError })
        }
    }
}
module.exports = new RegisterController