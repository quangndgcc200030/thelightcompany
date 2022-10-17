const express = require("express")
const router = express.Router()
const userController = require('../app/controllers/UserController')

router.get('/ordered/detail/:id', userController.detail)
router.get('/ordered', userController.index)

module.exports = router