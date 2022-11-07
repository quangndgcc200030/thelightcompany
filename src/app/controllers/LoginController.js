const bcrypt = require('bcrypt');
const passport = require('passport');
const dotenv = require('dotenv')
dotenv.config()
const { User } = require("../models/User");
var userProfile;
var userFacebook;

/*  Google AUTH  */
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/login/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

/*  Facebook AUTH  */
const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/login/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'name', 'photos', 'email']
},
    function (accessToken, refreshToken, profile, done) {
        userFacebook = profile;
        return done(null, userFacebook);
    }
));

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

    googleCallback(req, res) {
        const firstName = userProfile.name.givenName
        const lastName = userProfile.name.familyName
        const email = userProfile.emails[0].value
        const username = email.substr(0, email.indexOf('@'))

        res.render('register/register', {
            username: username,
            firstname: firstName,
            lastname: lastName,
            email: email,
        })
    }

    facebookCallback(req, res) {
        const firstName = userFacebook.name.givenName
        const lastName = userFacebook.name.familyName
        const middleName = userFacebook.name.middleName
        const username = firstName.concat(lastName.charAt(0).concat(middleName.charAt(0))).toLowerCase()

        res.render('register/register', {
            username: username,
            firstname: firstName,
            lastname: lastName + " " + middleName,
        })
        // res.json({ user: userFacebook })
    }

    error(req, res) {
        const conflicError = "Something is error"
        res.render('login/login', { account: username, error: conflicError })
    }
}
module.exports = new LoginController