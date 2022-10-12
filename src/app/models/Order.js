const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Order = {};

Order.add = (delivery_local, cust_name, cust_phone, total_price, username) => {
    return db.query(`INSERT INTO orders (ordered_date, delivery_date, delivery_local, cust_name, cust_phone, total_price, username, status) VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, false) RETURNING id`, [delivery_local, cust_name, cust_phone, total_price, username])
}

module.exports = { Order };