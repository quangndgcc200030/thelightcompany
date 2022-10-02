const { Supplier } = require("../models/Supplier");

class SupplierController {
    index(req, res) {
        Supplier.get()
            .then(suppliers => res.status(200).json({ status: "Successfully!", suppliers: suppliers.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Supplier.show(id)
            .then(supplier => res.status(200).json({ status: "Successfully!", supplier: supplier }))
            .catch(err => res.status(400).json({ err }));
    }

    add(req, res, next) {
        Supplier.create(req.body.name, req.body.telephone, req.body.email, req.body.address)
            .then(data => res.status(200).json({ msg: "Add category successfully!", supplier: req.body }))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        Supplier.update(id, req.body.name, req.body.telephone, req.body.email, req.body.address)
            .then(data => res.status(200).json({ msg: `Supplier #${id} updated successfully!` }))
            .catch(err => res.status(400).json(err));
    }

    delete(req, res, next) {
        let id = req.params.id
        Supplier.delete(id)
            .then(data => res.status(200).json({ msg: `Supplier #${id} deleted successfully!` }))
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new SupplierController