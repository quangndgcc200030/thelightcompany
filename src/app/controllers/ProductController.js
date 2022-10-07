const fs = require('fs');
const { Category } = require('../models/Category');
const { Product } = require('../models/Product');
const { Shop } = require('../models/Shop');
const { Supplier } = require('../models/Supplier');

class ProductController {
    index(req, res) {
        Product.get()
            .then(products => res.status(200).render('product/list', { products: products.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Product.show(id)
            .then(async product => {
                const categories = await Category.get()
                const suppliers = await Supplier.get()
                const shops = await Shop.get()
                res.status(200).render('product/update', {
                    product: product.rows[0],
                    categories: categories.rows,
                    suppliers: suppliers.rows,
                    shops: shops.rows
                })
            })
            .catch(err => res.status(400).json({ err }));
    }

    async interfaceadd(req, res, next) {
        try {
            const categories = await Category.get()
            const suppliers = await Supplier.get()
            const shops = await Shop.get()

            res.status(200).render('product/add', {
                categories: categories.rows, suppliers: suppliers.rows, shops: shops.rows
            })
        } catch (error) {

        }
    }

    add(req, res, next) {
        Product.create(req.body.name, req.body.price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id, req.body.shop_id)
            .then(data => res.status(200).redirect('/manage/product'))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        if (req.file) {
            Product.show(id)
                .then(product => {
                    fs.unlink('src/public/products/' + product.rows[0].image, function (err) {
                        if (err) throw err;
                        Product.updateHaveImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                            .then(data => res.status(200).redirect('/manage/product'))
                            .catch(err => res.status(400).json(err));
                    });
                })
                .catch(err => res.status(400).json({ err }));
        } else {
            Product.updateWithoutImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                .then(data => res.status(200).redirect('/manage/product'))
                .catch(err => res.status(400).json(err));
        }
    }

    delete(req, res, next) {
        let id = req.params.id
        Product.show(id)
            .then(product => {
                fs.unlink('src/public/products/' + product.rows[0].image, function (err) {
                    if (err) throw err;
                    Product.delete(id)
                        .then(data => res.status(200).redirect('/manage/product'))
                        .catch(err => res.status(400).json(err));
                });
            })
            .catch(err => res.status(400).json({ err }));
    }
}
module.exports = new ProductController