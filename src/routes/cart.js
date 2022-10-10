const express = require("express")
const router = express.Router()
const cartController = require('../app/controllers/CartController')

router.post('/add', cartController.add)
router.get('/', cartController.index)

module.exports = router