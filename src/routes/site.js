const express = require("express")
const app = express()
const router = express.Router()
const siteController = require('../app/controllers/SiteController')
const authMiddleware = require('../app/middlewares/AuthMiddleware')

router.post('/contact/save', authMiddleware.freedom, siteController.savecontact)
router.get('/logout', authMiddleware.loggedin, siteController.logout)
router.get('/manage', authMiddleware.admin, siteController.admin)
router.get('/view-detail/:id', authMiddleware.freedom, siteController.viewdetail)
router.get('/notification', authMiddleware.loggedin, siteController.notification)
router.get('/contact', authMiddleware.freedom, siteController.contact)
router.get('/about', authMiddleware.freedom, siteController.about)
router.get('/shop', authMiddleware.freedom, siteController.shop)
router.get('/', authMiddleware.freedom, siteController.index)

module.exports = router