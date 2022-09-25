const express = require("express")
const router = express.Router()
const profileController = require('../app/controllers/ProfileController')

router.put('/changepassword/store', profileController.changepasswordauth)
router.get('/changepassword', profileController.changepassword)
router.put('/update/store', profileController.updateauth)
router.get('/update', profileController.update)
router.get('/', profileController.index)

module.exports = router