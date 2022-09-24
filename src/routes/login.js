const express = require("express")
const router = express.Router()
const loginController = require('../app/controllers/LoginController')

router.post('/auth', loginController.auth)
router.get('/forgot', loginController.forgot)
router.get('/', loginController.index)

module.exports = router