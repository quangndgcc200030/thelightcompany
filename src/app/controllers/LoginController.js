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

    async googleCallback(req, res) {
        const firstName = userProfile.name.givenName
        const lastName = userProfile.name.familyName
        const email = userProfile.emails[0].value
        const username = email.substr(0, email.indexOf('@'))

        const user = await User.checkRegister(username)
        if (user.rowCount == 1) {
            req.session.loggedin = true
            req.session.user = user.rows[0]
            res.redirect('/')
        } else {
            const password = "123456"
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${day}-${month}-${year}`;

            User.create(username, hashed, firstName, lastName, true, currentDate, "", email, "", false)
                .then(data => {
                    req.session.loggedin = true
                    req.session.user = data.rows[0]
                    res.redirect('/')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('login/login', { account: username, error: conflicError })
                });
        }
    }

    async facebookCallback(req, res) {
        const firstName = userFacebook.name.givenName
        const lastName = userFacebook.name.familyName
        const middleName = userFacebook.name.middleName
        const username = toLowerCaseNonAccentVietnamese(firstName.concat(lastName.charAt(0).concat(middleName.charAt(0))))

        const user = await User.checkRegister(username)
        if (user.rowCount == 1) {
            req.session.loggedin = true
            req.session.user = user.rows[0]
            res.redirect('/')
        } else {
            const password = "123456"
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            // This arrangement can be altered based on how we want the date's format to appear.
            let currentDate = `${day}-${month}-${year}`;

            User.create(username, hashed, firstName, lastName, true, currentDate, "", "", "", false)
                .then(data => {
                    req.session.loggedin = true
                    req.session.user = data.rows[0]
                    res.redirect('/')
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('login/login', { account: username, error: conflicError })
                });
        }

        // This function converts the string to lowercase, then perform the conversion
        function toLowerCaseNonAccentVietnamese(str) {
            str = str.toLowerCase();
            //     We can also use this instead of from line 11 to line 17
            //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
            //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
            //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
            //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
            //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
            //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
            //     str = str.replace(/\u0111/g, "d");
            str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
            str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
            str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
            str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
            str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
            str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
            str = str.replace(/đ/g, "d");
            // Some system encode vietnamese combining accent as individual utf-8 characters
            str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
            str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
            return str;
        }
    }

    error(req, res) {
        const conflicError = "Something is error"
        res.render('login/login', { account: username, error: conflicError })
    }
}
module.exports = new LoginController