const fs = require('fs');
const { Product } = require('../models/Product');

class ProductController {
    index(req, res) {
        Product.get()
            .then(products => res.status(200).json({ status: "Successfully!", products: products.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Product.show(id)
            .then(product => res.status(200).json({ status: "Successfully!", product: product.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    add(req, res, next) {
        Product.create(req.body.name, req.body.price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id)
            .then(data => res.status(200).json({ msg: "Add product successfully!", product: req.body, file: req.file }))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        if (req.file) {
            Product.show(id)
                .then(product => {
                    fs.unlink('src/public/products/' + product.rows[0].image, function (err) {
                        if (err) throw err;
                        Product.updateHaveImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id)
                            .then(data => res.status(200).json({ msg: `Product #${id} updated successfully!` }))
                            .catch(err => res.status(400).json(err));
                    });
                })
                .catch(err => res.status(400).json({ err }));
        } else {
            Product.updateWithoutImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.body.cat_id, req.body.sup_id)
                .then(data => res.status(200).json({ msg: `Product #${id} updated successfully!` }))
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
                        .then(data => res.status(200).json({ msg: `Product #${id} deleted successfully!` }))
                        .catch(err => res.status(400).json(err));
                });
            })
            .catch(err => res.status(400).json({ err }));
    }
}
module.exports = new ProductController