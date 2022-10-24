const { Shop } = require("../models/Shop");

class ShopController {
    async index(req, res) {
        try {
            let shops
            if (req.query.search) {
                const searchValue = req.query.search

                const keywords = searchValue.split(" ")
                const searchTermKeywords = [];

                keywords.forEach(word => {
                    searchTermKeywords.push("sh.name ILIKE '%" + word + "%'")
                });

                const value = searchTermKeywords.join(" AND ")
                shops = await Shop.searchShop(value)
            } else {
                shops = await Shop.get()
            }

            res.render('shop/list', {
                shops: shops.rows
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.status(400).render('shop/list', { error: conflicError })
        }
    }

    show(req, res) {
        let id = req.params.id
        Shop.show(id)
            .then(shop => res.status(200).render('shop/update', { shop: shop.rows[0] }))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('shop/list', { error: conflicError })
            });
    }

    interfaceadd(req, res, next) {
        res.render('shop/add')
    }

    async add(req, res, next) {
        Shop.create(req.body.name, req.body.telephone, req.body.address)
            .then(data => res.redirect('/manage/shop'))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('shop/list', { error: conflicError })
            });
    }

    async update(req, res, next) {
        let id = req.params.id
        Shop.update(id, req.body.name, req.body.telephone, req.body.address)
            .then(data => res.redirect('/manage/shop'))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('shop/list', { error: conflicError })
            });
    }

    delete(req, res, next) {
        let id = req.params.id
        Shop.delete(id)
            .then(data => res.status(200).redirect('/manage/shop'))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('shop/list', { error: conflicError })
            });
    }
}
module.exports = new ShopController