const { Product } = require("../models/Product")
const { Category } = require("../models/Category")
const { Supplier } = require("../models/Supplier")
const { Shop } = require("../models/Shop")
const { Contact } = require("../models/Contact")
const PAGE_SIZE = 8

class SiteController {
    async index(req, res) {
        const products = await Product.showBestSelling()
        const categories = await Category.showTop4()

        res.render('home', {
            products: products.rows,
            categories: categories.rows
        })
    }

    async shop(req, res) {
        try {
            let products
            const categories = await Category.get()
            const suppliers = await Supplier.get()
            const shops = await Shop.get()

            if (req.query.cid) {
                products = await Product.findByCategory(req.query.cid)
            } else if (req.query.sid) {
                products = await Product.findBySupplier(req.query.sid)
            } else if (req.query.shid) {
                products = await Product.findByShop(req.query.shid)
            } else if (req.query.search) {
                const searchValue = req.query.search

                const keywords = searchValue.split(" ")
                const searchTermKeywords = [];

                keywords.forEach(word => {
                    searchTermKeywords.push("p.name ILIKE '%" + word + "%'")
                });

                const value = searchTermKeywords.join(" AND ")
                products = await Product.searchByValue(value)
            } else {
                products = await Product.showShop()
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

            res.render('site/shop', {
                products: resultProducts,
                categories: categories.rows,
                suppliers: suppliers.rows,
                shops: shops.rows
            })

        } catch (error) {
            const conflicError = "Something is error"
            res.render('site/shop', { error: conflicError })
        }
    }

    async viewdetail(req, res) {
        try {
            let id = req.params.id
            const products = await Product.viewDetail(id)
            res.status(200).render('site/viewdetail', {
                product: products.rows[0]
            })
            // res.status(200).render('site/viewdetail')
        } catch (error) {
            const conflicError = "Something is error"
            res.render('site/viewdetail', { error: conflicError })
        }
    }

    async contact(req, res) {
        try {
            let name = req.body.name
            let email = req.body.email
            let subject = req.body.subject
            let message = req.body.message

            Contact.create(name, email, subject, message)
                .then(data => {
                    res.render('home', {
                        status: "successfully"
                    })
                })
                .catch(err => {
                    res.render('home', {
                        status: "failure"
                    })
                })
        } catch (error) {
            res.redirect('/')
        }
    }

    about(req, res) {
        res.render('site/about')
    }

    async notification(req, res) {
        const notification = await Product.notification()

        res.render('site/notification', {
            notifications: notification.rows
        })
    }

    admin(req, res) {
        res.render('site/administration')
    }

    logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }
}

module.exports = new SiteController