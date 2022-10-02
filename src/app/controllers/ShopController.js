const { Shop } = require("../models/Shop");

class ShopController {
    index(req, res) {
        Shop.get()
            .then(shops => res.status(200).json({ status: "Successfully!", shops: shops.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Shop.show(id)
            .then(shop => res.status(200).json({ status: "Successfully!", shop: shop.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    add(req, res, next) {
        Shop.create(req.body.name, req.body.telephone, req.body.address)
            .then(data => res.status(200).json({ msg: "Add shop successfully!", shop: req.body }))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        Shop.update(id, req.body.name, req.body.telephone, req.body.address)
            .then(data => res.status(200).json({ msg: `Shop #${id} updated successfully!` }))
            .catch(err => res.status(400).json(err));
    }

    delete(req, res, next) {
        let id = req.params.id
        Shop.delete(id)
            .then(data => res.status(200).json({ msg: `Shop #${id} deleted successfully!` }))
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new ShopController