const fs = require('fs');
const { Category } = require("../models/Category")

class CategoryController {
    index(req, res) {
        Category.showAllCategory()
            .then(categories => res.status(200).render('category/list', { categories: categories.rows }))
            .catch(err => {
                const conflicError = "Something is error"
                res.status(400).render('category/list', { error: conflicError })
            });
    }

    show(req, res) {
        let id = req.params.id
        Category.show(id)
            .then(category =>
                res.status(200).render('category/update', {
                    category: category.rows[0]
                }))
            .catch(err => {
                const conflicError = "Something is error"
                res.render('category/update', { error: conflicError })
            });
    }

    interfaceadd(req, res, next) {
        res.render('category/add')
    }

    add(req, res, next) {
        Category.create(req.body.name, req.body.description, req.file.filename)
            .then(data => res.status(200).redirect('/manage/category'))
            .catch(err => {
                const conflicError = "Something is error"
                res.render('category/add', { error: conflicError })
            });
    }

    update(req, res, next) {
        let id = req.params.id
        if (req.file) {
            Category.show(id)
                .then(category => {
                    fs.unlink('src/public/categories/' + category.rows[0].image, function (err) {
                        if (err) throw err;
                        Category.updateHaveImage(id, req.body.name, req.body.description, req.file.filename)
                            .then(data => res.status(200).redirect('/manage/category'))
                            .catch(err => {
                                const conflicError = "Something is error"
                                res.render('category/update', { error: conflicError })
                            });
                    });
                })
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('category/update', { error: conflicError })
                });
        } else {
            Category.updateWithoutImage(id, req.body.name, req.body.description)
                .then(data => res.status(200).redirect('/manage/category'))
                .catch(err => {
                    const conflicError = "Something is error"
                    res.render('category/update', { error: conflicError })
                });
        }
    }

    delete(req, res, next) {
        let id = req.params.id
        Category.show(id)
            .then(category => {
                fs.unlink('src/public/categories/' + category.rows[0].image, function (err) {
                    if (err) throw err;
                    Category.delete(id)
                        .then(data => res.status(200).redirect('/manage/category'))
                        .catch(err => {
                            const conflicError = "Something is error"
                            res.render('category/list', { error: conflicError })
                        });
                });
            })
            .catch(err => {
                const conflicError = "Something is error"
                res.render('category/list', { error: conflicError })
            });
    }
}
module.exports = new CategoryController