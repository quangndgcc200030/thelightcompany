const { Contact } = require("../models/Contact")

class ContactController {
    async index(req, res) {
        try {
            let contacts
            
            if (req.query.search) {
                const searchValue = req.query.search

                const keywords = searchValue.split(" ")
                const searchTermKeywords = [];

                keywords.forEach(word => {
                    searchTermKeywords.push("email ILIKE '%" + word + "%'")
                });

                const value = searchTermKeywords.join(" AND ")
                contacts = await Contact.searchContact(value)
            } else {
                contacts = await Contact.showAllContact()
            }

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