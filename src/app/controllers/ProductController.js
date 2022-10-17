const fs = require('fs');
const { Category } = require('../models/Category');
const { Product } = require('../models/Product');
const { Shop } = require('../models/Shop');
const { Supplier } = require('../models/Supplier');
const PAGE_SIZE = 10

class ProductController {
    async index(req, res) {
        try {
            let products
            if (req.query.search) {
                const searchValue = req.query.search

                const keywords = searchValue.split(" ")
                const searchTermKeywords = [];

                keywords.forEach(word => {
                    searchTermKeywords.push("p.name ILIKE '%" + word + "%'")
                });

                const value = searchTermKeywords.join(" AND ")
                products = await Product.searchProductAdmin(value)
            } else {
                products = await Product.showAllProduct()
            }

            const page = parseInt(req.query.page)
            const startIndex = (page - 1) * PAGE_SIZE
            const endIndex = page * PAGE_SIZE

            const resultProducts = {}

            if (endIndex < products.rowCount) {
                resultProducts.next = {
                    page: page + 1
                }
            }

            if (startIndex > 0) {
                resultProducts.previous = {
                    page: page - 1
                }
            }

            resultProducts.page = page
            resultProducts.total_page = Math.ceil(products.rowCount / PAGE_SIZE)
            resultProducts.result = products.rows.slice(startIndex, endIndex)
            
            var arr = []
            products.rows.forEach(item => {
                arr.push(item.name)
            })

            // console.log(arr)
            // console.log(resultProducts.result)

            res.render('product/list', {
                products: resultProducts,
                arr: arr
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.status(400).render('product/list', {
                error: conflicError
            })
        }
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
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('product/list', {
                    error: conflicError
                })
            });
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
            const conflicError = "Something is error"
            res.status(400).render('product/list', {
                error: conflicError
            })
        }
    }

    add(req, res, next) {
        Product.create(req.body.name, req.body.price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id, req.body.shop_id)
            .then(data => res.status(200).redirect('/manage/product'))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('product/list', {
                    error: conflicError
                })
            });
    }

    update(req, res, next) {
        let id = req.params.id
        if (req.file) {
            Product.show(id)
                .then(product => {
                    fs.unlink('src/public/products/' + product.rows[0].image, function (err) {
                        if (err) throw err;
                        if (req.body.price != product.rows[0].price) {
                            Product.updateHaveImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                                .then(data => res.status(200).redirect('/manage/product?page=1'))
                                .catch(err => {
                                    const conflicError = "Something is error"
                                    res.status(400).render('product/list', {
                                        error: conflicError
                                    })
                                });
                        } else {
                            Product.updateHaveImage(id, req.body.name, req.body.price, product.rows[0].old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.file.filename, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                                .then(data => res.status(200).redirect('/manage/product?page=1'))
                                .catch(err => {
                                    const conflicError = "Something is error"
                                    res.status(400).render('product/list', {
                                        error: conflicError
                                    })
                                });
                        }
                    });
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.status(400).render('product/list', {
                        error: conflicError
                    })
                });
        } else {
            Product.show(id)
                .then(product => {
                    if (req.body.price != product.rows[0].price) {
                        Product.updateWithoutImage(id, req.body.name, req.body.price, req.body.old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                            .then(data => res.status(200).redirect('/manage/product?page=1'))
                            .catch(err => {
                                const conflicError = "Something is error"
                                res.status(400).render('product/list', {
                                    error: conflicError
                                })
                            });
                    } else {
                        Product.updateWithoutImage(id, req.body.name, req.body.price, product.rows[0].old_price, req.body.small_desc, req.body.detail_desc, req.body.for_gender, req.body.for_age, req.body.quantity, req.body.cat_id, req.body.sup_id, req.body.shop_id)
                            .then(data => res.status(200).redirect('/manage/product?page=1'))
                            .catch(err => {
                                const conflicError = "Something is error"
                                res.status(400).render('product/list', {
                                    error: conflicError
                                })
                            });
                    }
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.status(400).render('product/list', {
                        error: conflicError
                    })
                });
        }
    }

    delete(req, res, next) {
        let id = req.params.id
        Product.show(id)
            .then(product => {
                fs.unlink('src/public/products/' + product.rows[0].image, function (err) {
                    if (err) throw err;
                    Product.delete(id)
                        .then(data => res.status(200).redirect('/manage/product?page=1'))
                        .catch(err => {
                            const conflicError = "Something is error"
                            res.status(400).render('product/list', {
                                error: conflicError
                            })
                        });
                });
            })
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('product/list', {
                    error: conflicError
                })
            });
    }
}
module.exports = new ProductController