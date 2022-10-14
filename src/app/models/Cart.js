const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Cart = {};

Cart.add = (total_price, username) => {
    return db.query(`INSERT INTO carts (total_price, username) VALUES ($1, $2) RETURNING id`, [total_price, username])
}


Cart.find = username => {
    return db.query(`SELECT * FROM carts WHERE username = $1`, [username])
}

Cart.update = (id, total_price, username) => {
    return db.query(`UPDATE carts SET total_price = $2 WHERE id = $1 AND username = $3`, [id, total_price, username])
}

Cart.showCart = username => {
    return db.query(`SELECT c.id, c.total_price, COUNT(cd.product_id) FROM carts as c INNER JOIN cart_details as cd ON cd.cart_id = c.id WHERE c.username = $1 GROUP BY c.id`, [username])
}

Cart.deleteCart = id => {
    return db.query(`DELETE FROM carts WHERE id = $1`, [id])
}

module.exports = { Cart };