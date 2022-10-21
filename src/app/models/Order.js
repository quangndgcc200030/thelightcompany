const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Order = {};

Order.add = (delivery_local, cust_name, cust_phone, total_price, username) => {
    return db.query(`INSERT INTO orders (ordered_date, delivery_date, delivery_local, cust_name, cust_phone, total_price, username, status) 
                    VALUES (CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $1, $2, $3, $4, $5, false) 
                    RETURNING id`, [delivery_local, cust_name, cust_phone, total_price, username])
}

Order.showAllOrders = () => {
    return db.query(`SELECT * FROM orders as o ORDER BY o.ordered_date DESC`)
}

Order.changeStatus = (id, status) => {
    return db.query(`UPDATE orders SET delivery_date = CURRENT_TIMESTAMP, status = $2 WHERE id = $1`, [id, status])
}

Order.delete = id => {
    return db.query(`DELETE FROM orders WHERE id = $1`, [id])
}

Order.showUserOrdered = username => {
    return db.query(`SELECT * FROM orders as o WHERE o.username = $1 ORDER BY o.ordered_date DESC`, [username])
}

Order.searchOrder = (day, month, year) => {
    return db.query(`SELECT * FROM orders as o WHERE EXTRACT(DAY FROM o.ordered_date) = $1 AND EXTRACT(MONTH FROM o.ordered_date) = $2 AND EXTRACT(YEAR FROM o.ordered_date) = $3 ORDER BY o.ordered_date DESC`, [day, month, year])
}

module.exports = { Order };