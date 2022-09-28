const express = require("express")
const router = express.Router()
const supplierController = require('../app/controllers/SupplierController')

router.delete('/delete/:id', supplierController.delete)
router.put('/update/:id', supplierController.update)
router.post('/add/store', supplierController.add)
router.get('/show/:id', supplierController.show)
router.get('/', supplierController.index)

module.exports = router