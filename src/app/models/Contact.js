const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Contact = {};

Contact.create = (name, email, subject, message) => {
    return db.query(`INSERT INTO contacts ("name", email, subject, message, send_date) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`, [name, email, subject, message])
}

Contact.showAllContact = () => {
    return db.query(`SELECT * FROM contacts ORDER BY send_date DESC`)
}

Contact.delete = id => {
    return db.query(`DELETE FROM contacts WHERE id = $1`, [id])
}

Contact.searchContact = value => {
    return db.query(`SELECT * FROM contacts WHERE ${value} ORDER BY send_date DESC`)
}

module.exports = { Contact };