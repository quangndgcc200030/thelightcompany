const express = require("express")
const router = express.Router()
const productController = require('../app/controllers/ProductController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/products/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})

router.delete('/delete/:id', productController.delete)
router.put('/update/:id', upload.single('image'), productController.update)
router.post('/add/store', upload.single('image'), productController.add)
router.get('/show/:id', productController.show)
router.get('/', productController.index)

module.exports = router