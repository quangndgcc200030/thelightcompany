const bcrypt = require('bcrypt')
const { User } = require("../models/User");

class ProfileController {
    index(req, res) {
        const user = req.session.user
        User.findUser(user.username)
            .then(user => {
                res.render('profile/profile', {
                    user: user.rows[0]
                })
            })
            .catch(err => {
                const conflicError = "Something is error"
                res.render('profile/profile', {
                    user: user.rows[0],
                    error: conflicError
                })
            })
    }

    async updateauth(req, res) {
        try {
            //Get information from form
            const username = req.body.username
            const firstname = req.body.firstname.trim()
            const lastname = req.body.lastname.trim()
            const gender = req.body.gender
            const birthdate = req.body.birthdate
            const telephone = req.body.telephone
            const email = req.body.email
            const address = req.body.address.trim()

            var user = await User.findUser(username)
            if (user.rowCount != 0) {
                User.updateprofile(username, firstname, lastname, gender, birthdate, telephone, email, address)
                    .then(async data => {
                        user = await User.findUser(username)
                        const success = "Update profile successfully"
                        res.render('profile/profile', {
                            user: user.rows[0],
                            successProfile: success
                        })
                    })
                    .catch(err => {
                        const conflicError = "Something is error"
                        res.render('profile/profile', {
                            user: user.rows[0],
                            errorProfile: conflicError
                        })
                    });
            } else {
                const conflicError = "Something is error"
                res.render('profile/profile', {
                    user: user.rows[0],
                    errorProfile: conflicError
                })
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.render('profile/profile', {
                user: user.rows[0],
                errorProfile: conflicError
            })
        }
    }

    async changepasswordauth(req, res) {
        try {
            //Get information from form
            const userSession = req.session.user
            const old_password = req.body.old_password.trim()
            const new_password = req.body.new_password.trim()

            var user = await User.findUser(userSession.username)
            if (user.rowCount == 1) {
                const validPass = await bcrypt.compare(
                    old_password,
                    user.rows[0].password
                )

                if (validPass) {
                    const salt = await bcrypt.genSalt(10)
                    const hashed = await bcrypt.hash(new_password, salt)

                    User.changepassword(userSession.username, hashed)
                        .then(data => {
                            const success = "Change password successfully!"
                            res.render('profile/profile', {
                                user: user.rows[0],
                                successPassword: success
                            })
                        })
                        .catch(err => {
                            const conflicError = "Something is error"
                            res.render('profile/profile', {
                                user: user.rows[0],
                                errorPassword: conflicError
                            })
                        });
                } else {
                    const conflicError = "Old password does not match"
                    res.render('profile/profile', {
                        user: user.rows[0],
                        errorPassword: conflicError
                    })
                }

            } else {
                const conflicError = "Something is error"
                res.render('profile/profile', {
                    user: user.rows[0],
                    errorPassword: conflicError
                })
            }
        } catch (err) {
            const conflicError = "Something is error"
            res.render('profile/profile', {
                user: user.rows[0],
                errorPassword: conflicError
            })
        }
    }
}
module.exports = new ProfileController