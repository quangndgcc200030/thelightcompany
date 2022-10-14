const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Shop = {};

// CREATE SHOP
Shop.create = (name, telephone, address) => {
    return db.query(`INSERT INTO shops ("name", telephone, address) VALUES ($1, $2, $3)`,
        [name, telephone, address]);
};

// GET ALL SHOP
Shop.get = () => {
    return db.query('SELECT * FROM shops');
};

// UPDATE AN SHOP
Shop.update = (id, name, telephone, address) => {
    return db.query(`UPDATE shops SET "name" = $2, telephone = $3, address = $4 WHERE id = $1`, [
        id, name, telephone, address
    ]);
};

// DELETE AN SHOP
Shop.delete = id => {
    return db.query(`DELETE FROM shops WHERE id = $1`, [id]);
};

//GET A SHOP
Shop.show = id => {
    return db.query(`SELECT * FROM shops WHERE id = $1`, [id]);
};

// SEARCH SHOP
Shop.searchShop = value => {
    const query = 'SELECT * FROM shops as sh WHERE ' + value
    return db.query(query);
};

module.exports = { Shop };