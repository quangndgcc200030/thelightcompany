const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const OrderDetail = {};

OrderDetail.add = (order_id, product_id, quantity, total_price) => {
    return db.query(`INSERT INTO order_details (order_id, product_id, quantity, total_price) VALUES ($1, $2, $3, $4)`, [order_id, product_id, quantity, total_price])
}

OrderDetail.showAllOrderDetail = id => {
    return db.query(`SELECT od.order_id, od.product_id, od.quantity, od.total_price, p.name, p.price, p.image FROM order_details as od INNER JOIN products as p ON p.id = od.product_id WHERE od.order_id = $1`, [id])
}

module.exports = { OrderDetail };