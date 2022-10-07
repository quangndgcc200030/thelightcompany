const { Shop } = require("../models/Shop");

class ShopController {
    index(req, res) {
        Shop.get()
            .then(shops => res.status(200).render('shop/list', { shops: shops.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Shop.show(id)
            .then(shop => res.status(200).render('shop/update', { shop: shop.rows[0] }))
            .catch(err => res.status(400).json({ err }));
    }

    interfaceadd(req, res, next) {
        res.render('shop/add')
    }

    add(req, res, next) {
        Shop.create(req.body.name, req.body.telephone, req.body.address)
            .then(data => res.status(200).redirect('/manage/shop'))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        Shop.update(id, req.body.name, req.body.telephone, req.body.address)
            .then(data => res.status(200).redirect('/manage/shop'))
            .catch(err => res.status(400).json(err));
    }

    delete(req, res, next) {
        let id = req.params.id
        Shop.delete(id)
            .then(data => res.status(200).redirect('/manage/shop'))
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new ShopController