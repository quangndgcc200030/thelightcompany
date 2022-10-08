const express = require("express")
const router = express.Router()
const siteController = require('../app/controllers/SiteController')

router.get('/logout', siteController.logout)
router.get('/manage', siteController.admin)
router.get('/view-detail/:id', siteController.viewdetail)
router.get('/about', siteController.about)
router.get('/shop', siteController.shop)
router.get('/', siteController.index)

module.exports = router