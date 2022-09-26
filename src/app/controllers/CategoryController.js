const fs = require('fs');
const { Category } = require("../models/Category")

class CategoryController {
    index(req, res) {
        Category.get()
            .then(categories => res.status(200).json({ status: "Successfully!", categories: categories }))
            .catch(err => res.status(400).json({ err }));
    }

    show(req, res) {
        let id = req.params.id
        Category.show(id)
            .then(category => res.status(200).json({ status: "Successfully!", category: category }))
            .catch(err => res.status(400).json({ err }));
    }

    add(req, res, next) {
        Category.create(req.body.name, req.body.description, req.file.filename)
            .then(data => res.status(200).json({ msg: "Add category successfully!", category: req.body, file: req.file }))
            .catch(err => res.status(400).json(err));
    }

    update(req, res, next) {
        let id = req.params.id
        if (req.file) {
            Category.show(id)
                .then(category => {
                    fs.unlink('src/public/categories/' + category.rows[0].image, function (err) {
                        if (err) throw err;
                        Category.updateHaveImage(id, req.body.name, req.body.description, req.file.filename)
                            .then(data => res.status(200).json({ msg: `Category #${id} updated successfully!` }))
                            .catch(err => res.status(400).json(err));
                    });
                })
                .catch(err => res.status(400).json({ err }));
        } else {
            Category.updateWithoutImage(id, req.body.name, req.body.description)
                .then(data => res.status(200).json({ msg: `Category #${id} updated successfully!` }))
                .catch(err => res.status(400).json(err));
        }
    }

    delete(req, res, next) {
        let id = req.params.id
        Category.show(id)
            .then(category => {
                fs.unlink('src/public/categories/' + category.rows[0].image, function (err) {
                    if (err) throw err;
                    Category.delete(id)
                        .then(data => res.status(200).json({ msg: `Category #${id} deleted successfully!` }))
                        .catch(err => res.status(400).json(err));
                });
            })
            .catch(err => res.status(400).json({ err }));
    }
}
module.exports = new CategoryController