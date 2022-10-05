const { Product } = require("../models/Product")
const { Category } = require("../models/Category")
const { Supplier } = require("../models/Supplier")
class SiteController {
    index(req, res) {
        Category.get()
            .then(categories => res.status(200).render('home', { categories: categories.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    async shop(req, res) {
        try {
            const products = await Product.get()
            const categories = await Category.get()
            const suppliers = await Supplier.get()

            res.status(200).render('site/shop', {
                products: products.rows, categories: categories.rows, suppliers: suppliers.rows
            })
        } catch (error) {

        }
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