const express = require("express")
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.get('/logout', authMiddleware.loggedin, siteController.logout)
router.get('/manage', authMiddleware.admin, siteController.admin)
router.get('/view-detail/:id', authMiddleware.freedom, siteController.viewdetail)
router.get('/about', authMiddleware.freedom, siteController.about)
router.get('/shop', authMiddleware.freedom, siteController.shop)
router.get('/', authMiddleware.freedom, siteController.index)

module.exports = router