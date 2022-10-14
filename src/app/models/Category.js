const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Category = {};

// CREATE CATEGORY
Category.create = (name, description, image) => {
    return db.query(`INSERT INTO categories ("name", description, image, updated_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`,
        [name, description, image]);
};

// GET ALL CATEGORY
Category.get = () => {
    return db.query('SELECT * FROM categories');
};

// UPDATE AN CATEGORY HAVE IMAGE
Category.updateHaveImage = (id, name, description, image) => {
    return db.query(`UPDATE categories SET "name" = $2, description = $3, image = $4, updated_date = CURRENT_TIMESTAMP WHERE id = $1`, [
        id, name, description, image
    ]);
};

// UPDATE AN CATEGORY NOT HAVE IMAGE
Category.updateWithoutImage = (id, name, description) => {
    return db.query(`UPDATE categories SET "name" = $2, description = $3 WHERE id = $1`, [
        id, name, description
    ]);
};

// DELETE AN CATEGORY
Category.delete = id => {
    return db.query(`DELETE FROM categories WHERE id = $1`, [id]);
};

//GET A CATEGORY
Category.show = id => {
    return db.query(`SELECT * FROM categories WHERE id = $1`, [id]);
};

//Show all category
Category.showAllCategory = () => {
    return db.query('SELECT * FROM categories as c ORDER BY c.updated_date DESC');
};

//Search category
Category.searchCategory = value => {
    const query = 'SELECT * FROM categories as c WHERE ' + value + ' ORDER BY c.updated_date DESC'
    return db.query(query);
};

//Show top 4 category
Category.showTop4 = () => {
    return db.query('SELECT c.id, c.image, c.name, COUNT(c.id), SUM(od.quantity) FROM categories as c FULL OUTER JOIN products as p ON p.cat_id = c.id FULL OUTER JOIN order_details as od ON od.product_id = p.id GROUP BY c.id ORDER BY SUM(od.quantity) DESC NULLS LAST, c.updated_date DESC LIMIT 4');
};

module.exports = { Category };