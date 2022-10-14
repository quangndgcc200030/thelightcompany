const express = require("express")
const router = express.Router()
const cartController = require('../app/controllers/CartController')

router.get('/clear/:id', cartController.clear)
router.get('/remove', cartController.remove)
router.post('/add', cartController.add)
router.get('/', cartController.index)

module.exports = router