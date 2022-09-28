const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Supplier = {};

// CREATE CATEGORY
Supplier.create = (name, telephone, email, address) => {
    return db.query(`INSERT INTO suppliers ("name", telephone, email, address) VALUES ($1, $2, $3, $4)`,
        [name, telephone, email, address]);
};

// GET ALL CATEGORY
Supplier.get = () => {
    return db.query('SELECT * FROM suppliers');
};

// UPDATE AN CATEGORY HAVE IMAGE
Supplier.update = (id, name, telephone, email, address) => {
    return db.query(`UPDATE suppliers SET "name" = $2, telephone = $3, email = $4, address = $5 WHERE id = $1`, [
        id, name, telephone, email, address
    ]);
};

// DELETE AN CATEGORY
Supplier.delete = id => {
    return db.query(`DELETE FROM suppliers WHERE id = $1`, [id]);
};

//GET A CATEGORY
Supplier.show = id => {
    return db.query(`SELECT * FROM suppliers WHERE id = $1`, [id]);
};

module.exports = { Supplier };