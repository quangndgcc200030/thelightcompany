const express = require("express")
const router = express.Router()
const orderController = require('../app/controllers/OrderController')

router.delete('/delete/:id', orderController.delete)
router.post('/status', orderController.status)
router.get('/detail/:id', orderController.detail)
router.get('/', orderController.index)

module.exports = router