const bcrypt = require('bcrypt')
const { User } = require("../models/User");

class ProfileController {
    index(req, res) {
        res.json("Welcome to profile");
    }

    update(req, res) {
        res.json("Welcome to update profile");
    }

    updateauth(req, res) {
        res.json("Welcome to update profile");
    }
}
module.exports = new ProfileController