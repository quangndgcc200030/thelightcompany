const { Supplier } = require("../models/Supplier");

class SupplierController {
    async index(req, res) {
        try {
            let suppliers
            if (req.query.search) {
                const searchValue = req.query.search

                const keywords = searchValue.split(" ")
                const searchTermKeywords = [];

                keywords.forEach(word => {
                    searchTermKeywords.push("s.name ILIKE '%" + word + "%'")
                });

                const value = searchTermKeywords.join(" AND ")
                suppliers = await Supplier.searchSupplier(value)
            } else {
                suppliers = await Supplier.get()
            }

            res.render('supplier/list', {
                suppliers: suppliers.rows
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.status(400).render('supplier/list', { error: conflicError })
        }
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