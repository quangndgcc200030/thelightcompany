const { Category } = require("../models/Category")

class SiteController {
    index(req, res) {
        Category.get()
            .then(categories => res.status(200).render('home', { categories: categories.rows }))
            .catch(err => res.status(400).json({ err }));
    }
}
module.exports = new SiteController