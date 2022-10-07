const express = require("express")
const router = express.Router()
const shopController = require('../app/controllers/ShopController')

router.delete('/delete/:id', shopController.delete)
router.put('/update/:id', shopController.update)
router.post('/add/store', shopController.add)
router.get('/add', shopController.interfaceadd)
router.get('/show/:id', shopController.show)
router.get('/', shopController.index)

module.exports = router