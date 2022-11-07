const express = require("express")
const router = express.Router()
const passport = require('passport');
const loginController = require('../app/controllers/LoginController')

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), loginController.facebookCallback)
router.get('/auth/facebook', passport.authenticate('facebook'))
router.get('/error', loginController.error);
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/error' }), loginController.googleCallback)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.post('/auth', loginController.auth)
router.get('/forgot', loginController.forgot)
router.get('/', loginController.index)

module.exports = router