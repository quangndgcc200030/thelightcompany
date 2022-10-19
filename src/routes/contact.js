const express = require("express")
const router = express.Router()
const contactController = require('../app/controllers/ContactController')

router.delete('/delete/:id', contactController.delete)
router.get('/', contactController.index)

module.exports = router