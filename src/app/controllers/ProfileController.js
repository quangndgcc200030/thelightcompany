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
            var user = await User.findUser(req.body.username)
            if (user.rowCount != 0) {
                User.updateprofile(req.body.username, req.body.firstname, req.body.lastname, req.body.gender, req.body.birthdate, req.body.telephone, req.body.email, req.body.address)
                    .then(async data => {
                        user = await User.findUser(req.body.username)
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
            const userSession = req.session.user
            var user = await User.findUser(userSession.username)
            if (user.rowCount == 1) {
                const validPass = await bcrypt.compare(
                    req.body.old_password,
                    user.rows[0].password
                )

                if (validPass) {
                    const salt = await bcrypt.genSalt(10)
                    const hashed = await bcrypt.hash(req.body.new_password, salt)

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