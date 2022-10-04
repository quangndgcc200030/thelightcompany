const bcrypt = require('bcrypt')
const { User } = require('../models/User')

class RegisterController {
    index(req, res) {
        User.get()
            .then(data => res.status(200).render('register/register'))
            .catch(err => res.status(400).json({ err }));
        // res.render('register/register');
    }

    async auth(req, res) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt)

            User.create(req.body.username, hashed, req.body.firstname, req.body.lastname, req.body.gender, req.body.birthdate, req.body.telephone, req.body.email, req.body.address, false)
                .then(data => res.status(200).json({ status: "Register account successfully!", user: req.body }))
                .catch(err => res.status(400).json(err));
            // res.json(hashed)
        } catch (err) {
            res.status(400).json(err);
        }
    }
}
module.exports = new RegisterController