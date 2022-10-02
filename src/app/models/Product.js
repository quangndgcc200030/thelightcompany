const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Product = {};

// CREATE PRODUCT
Product.create = (name, price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id) => {
    return db.query(`INSERT INTO products ("name", price, old_price, small_desc, detail_desc, for_gender, for_age, updated_date, quantity, image, cat_id, sup_id, shop_id) VALUES ($1, $2, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7, $8, $9, $10, $11)`,
        [name, price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id]);
};

// GET ALL PRODUCT
Product.get = () => {
    return db.query('SELECT * FROM products');
};

// UPDATE AN PRODUCT HAVE IMAGE
Product.updateHaveImage = (id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id) => {
    return db.query(`UPDATE products SET "name" = $2, price = $3, old_price = $4, small_desc = $5, detail_desc = $6, for_gender = $7, for_age = $8, updated_date = CURRENT_TIMESTAMP, quantity = $9, image = $10, cat_id = $11, sup_id = $12, shop_id = $13 WHERE id = $1`, [
        id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id
    ]);
};

// UPDATE AN PRODUCT NOT HAVE IMAGE
Product.updateWithoutImage = (id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, cat_id, sup_id, shop_id) => {
    return db.query(`UPDATE products SET "name" = $2, price = $3, old_price = $4, small_desc = $5, detail_desc = $6, for_gender = $7, for_age = $8, updated_date = CURRENT_TIMESTAMP, quantity = $9, cat_id = $10, sup_id = $11, shop_id = $12 WHERE id = $1`, [
        id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, cat_id, sup_id, shop_id
    ]);
};

// DELETE AN PRODUCT
Product.delete = id => {
    return db.query(`DELETE FROM products WHERE id = $1`, [id]);
};

//GET A PRODUCT
Product.show = id => {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id]);
};

module.exports = { Product };