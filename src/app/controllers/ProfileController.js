const bcrypt = require('bcrypt')
const { User } = require("../models/User");

class ProfileController {
    index(req, res) {
        res.json("Welcome to profile");
    }

    update(req, res) {
        res.json("Welcome to update profile");
    }

    async updateauth(req, res) {
        try {
            var user = await User.findUser(req.body.username)
            if (user.rowCount != 0) {
                User.updateprofile(req.body.username, req.body.firstname, req.body.lastname, req.body.gender, req.body.birthdate, req.body.telephone, req.body.email, req.body.address)
                    .then(data => res.status(200).json({ status: "Successfully", mgs: "Update successfully!" }))
                    .catch(err => res.status(400).json({ err }));
            } else {
                res.status(404).json({ status: "Fail", user: "Not Found" })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }

    changepassword(req, res) {
        res.json("Welcome to change password");
    }

    async changepasswordauth(req, res) {
        try {
            var user = await User.findUser(req.body.username)
            if (user.rowCount != 0) {
                const salt = await bcrypt.genSalt(10)
                const hashed = await bcrypt.hash(req.body.password, salt)

                User.changepassword(req.body.username, hashed)
                    .then(data => res.status(200).json({ status: "Successfully", mgs: "Change password successfully!" }))
                    .catch(err => res.status(400).json({ err }));
            } else {
                res.status(404).json({ status: "Fail", user: "Not Found" })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = new ProfileController