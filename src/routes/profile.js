const express = require("express")
const router = express.Router()
const profileController = require('../app/controllers/ProfileController')

router.post('/update/auth', profileController.updateauth)
router.get('/update', profileController.update)
router.get('/', profileController.index)

module.exports = router