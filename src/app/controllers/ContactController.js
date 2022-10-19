const { Contact } = require("../models/Contact")

class ContactController {
    async index(req, res) {
        try {
            var contacts = await Contact.showAllContact()
            res.render('contact/list', {
                contacts: contacts.rows
            })
        } catch (error) {
            const conflicError = "Something is error"
            res.render('contact/list', { error: conflicError })
        }
    }

    async delete(req, res, next) {
        try {
            let id = req.params.id
            Contact.delete(id)
                .then(data => res.status(200).redirect('/manage/contact'))
                .catch(err => res.status(400).json(err));
        } catch (error) {
            const conflicError = "Something is error"
            res.render('contact/list', { error: conflicError })
        }
    }
}
module.exports = new ContactController