const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const OrderDetail = {};

OrderDetail.add = (order_id, product_id, quantity, total_price) => {
    return db.query(`INSERT INTO order_details (order_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4)`, [order_id, product_id, quantity, total_price])
}

module.exports = { OrderDetail };