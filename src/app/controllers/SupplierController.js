const { Supplier } = require("../models/Supplier");

class SupplierController {
    index(req, res) {
        Supplier.get()
            .then(suppliers => res.status(200).render('supplier/list', { suppliers: suppliers.rows }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Supplier.show(id)
            .then(supplier => res.status(200).render('supplier/update', { supplier: supplier.rows[0] }))
            .catch(err => res.status(400).json({ err }));
    }

    interfaceadd(req, res, next) {
        res.render('supplier/add')
    }

    async add(req, res, next) {
        const supTele = await Supplier.findDuplicate(req.body.telephone, req.body.email)
        if (supTele.rowCount == 1) {
            const conflicError = "Duplicate telephone or address"
            return res.render('supplier/add', {
                name: req.body.name,
                telephone: req.body.telephone,
                email: req.body.email,
                address: req.body.address,
                error: conflicError
            })
        } else {
            Supplier.create(req.body.name, req.body.telephone, req.body.email, req.body.address)
                .then(data => res.status(200).redirect('/manage/supplier'))
                .catch(err => res.status(200).redirect('/manage/supplier'));
        }
    }

    update(req, res, next) {
        let id = req.params.id
        Supplier.update(id, req.body.name, req.body.telephone, req.body.email, req.body.address)
            .then(data => res.status(200).redirect('/manage/supplier'))
            .catch(err => res.status(400).json(err));
    }

    delete(req, res, next) {
        let id = req.params.id
        Supplier.delete(id)
            .then(data => res.status(200).redirect('/manage/supplier'))
            .catch(err => res.status(400).json(err));
    }
}
module.exports = new SupplierController