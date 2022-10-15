const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const CartDetail = {};

CartDetail.add = (cart_id, product_id, quantity, total_price) => {
    return db.query(`INSERT INTO cart_details (cart_id, product_id, quantity, total_price) 
                    VALUES ($1, $2, $3, $4) RETURNING total_price`, [cart_id, product_id, quantity, total_price])
}

CartDetail.find = cart_id => {
    return db.query(`SELECT * FROM cart_details WHERE cart_id = $1`, [cart_id])
}

CartDetail.findOne = (cart_id, product_id) => {
    return db.query(`SELECT * FROM cart_details WHERE cart_id = $1 AND product_id = $2`, [cart_id, product_id])
}

CartDetail.update = (cart_id, product_id, quantity, total_price) => {
    return db.query(`UPDATE cart_details SET quantity = $3, 
                                            total_price = $4 
                    WHERE cart_id = $1 AND product_id = $2 
                    RETURNING cart_id`, [cart_id, product_id, quantity, total_price])
}

//Show cart
CartDetail.showCartDetail = id => {
    return db.query(`SELECT cd.cart_id, cd.quantity, cd.total_price, p.id as product_id, p.name, p.price as pro_price, p.small_desc, p.image 
                    FROM cart_details as cd INNER JOIN carts as c ON c.id = cd.cart_id 
                                            INNER JOIN products as p ON p.id = cd.product_id 
                    WHERE c.id = $1`, [id])
}

CartDetail.remove = (cart_id, product_id) => {
    return db.query(`DELETE FROM cart_details WHERE cart_id = $1 AND product_id = $2`, [cart_id, product_id])
}

module.exports = { CartDetail };