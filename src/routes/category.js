const express = require("express")
const router = express.Router()
const categoryController = require('../app/controllers/CategoryController')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'src/public/categories/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.delete('/delete/:id', categoryController.delete)
router.put('/update/:id', upload.single('image'), categoryController.update)
router.post('/add/store', upload.single('image'), categoryController.add)
router.get('/show/:id', categoryController.show)
router.get('/', categoryController.index)

module.exports = router