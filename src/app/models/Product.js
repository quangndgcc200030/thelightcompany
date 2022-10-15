const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const Product = {};

// CREATE PRODUCT
Product.create = (name, price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id) => {
    return db.query(`INSERT INTO products ("name", price, old_price, small_desc, detail_desc, for_gender, for_age, updated_date, quantity, image, cat_id, sup_id, shop_id) 
                    VALUES ($1, $2, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP, $7, $8, $9, $10, $11)`,
        [name, price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id]);
};

// GET ALL PRODUCT
Product.get = () => {
    return db.query('SELECT * FROM products ORDER BY updated_date DESC');
};

// UPDATE AN PRODUCT HAVE IMAGE
Product.updateHaveImage = (id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id) => {
    return db.query(`UPDATE products SET "name" = $2, 
                                        price = $3, 
                                        old_price = $4, 
                                        small_desc = $5, 
                                        detail_desc = $6, 
                                        for_gender = $7, 
                                        for_age = $8, 
                                        updated_date = CURRENT_TIMESTAMP, 
                                        quantity = $9, 
                                        image = $10, 
                                        cat_id = $11, 
                                        sup_id = $12, 
                                        shop_id = $13 
                                        WHERE id = $1`,
        [id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, image, cat_id, sup_id, shop_id]);
};

// UPDATE AN PRODUCT NOT HAVE IMAGE
Product.updateWithoutImage = (id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, cat_id, sup_id, shop_id) => {
    return db.query(`UPDATE products SET "name" = $2, 
                                        price = $3, 
                                        old_price = $4, 
                                        small_desc = $5, 
                                        detail_desc = $6, 
                                        for_gender = $7, 
                                        for_age = $8, 
                                        updated_date = CURRENT_TIMESTAMP, 
                                        quantity = $9, 
                                        cat_id = $10, 
                                        sup_id = $11, 
                                        shop_id = $12 
                                        WHERE id = $1`,
        [id, name, price, old_price, small_desc, detail_desc, for_gender, for_age, quantity, cat_id, sup_id, shop_id]);
};

// DELETE AN PRODUCT
Product.delete = id => {
    return db.query(`DELETE FROM products WHERE id = $1`, [id]);
};

//GET A PRODUCT
Product.show = id => {
    return db.query(`SELECT * FROM products WHERE id = $1`, [id]);
};

//Show all product
Product.showAllProduct = () => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.for_gender, p.for_age, p.quantity, p.image, c.name as cat_name, su.name as sup_name, sh.name as shop_name 
                    FROM products as p INNER JOIN categories as c ON c.id = p.cat_id 
                                        INNER JOIN suppliers as su ON su.id = p.sup_id 
                                        INNER JOIN shops as sh ON sh.id = p.shop_id 
                    ORDER BY p.updated_date DESC`);
};

//Viewdetail
Product.viewDetail = id => {
    return db.query(`SELECT p.id, p.name, p.price, p.small_desc, p.detail_desc, p.for_gender, p.for_age, p.quantity, p.image, c.name as cat_name, su.name as sup_name, sh.name as shop_name, round((100 - ((p.price*100)/p.old_price))) as sale 
                    FROM products as p INNER JOIN categories as c ON c.id = p.cat_id 
                                        INNER JOIN suppliers as su ON su.id = p.sup_id 
                                        INNER JOIN shops as sh ON sh.id = p.shop_id 
                    WHERE p.id = $1`, [id])
}

//Show shop
Product.showShop = () => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id 
                    ORDER BY p.updated_date DESC, SUM(od.quantity) DESC NULLS LAST`);
};

// UPDATE AN QUANTITY PRODUCT
Product.updateQuantity = (id, quantity) => {
    return db.query(`UPDATE products SET quantity = $2 WHERE id = $1`, [id, quantity]);
};

// FIND BY CATEGORY ID
Product.findByCategory = id => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id HAVING p.cat_id = $1 
                    ORDER BY SUM(od.quantity) DESC NULLS LAST, p.updated_date DESC`, [id])
}

//FIND BY SUPPLIER ID
Product.findBySupplier = id => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id HAVING p.sup_id = $1 
                    ORDER BY SUM(od.quantity) DESC NULLS LAST, p.updated_date DESC`, [id])
}

//FIND BY SHOP ID
Product.findByShop = id => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id HAVING p.shop_id = $1 
                    ORDER BY SUM(od.quantity) DESC NULLS LAST, p.updated_date DESC`, [id])
}

//SEARCH PRODUCTS
Product.searchByValue = (value) => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id 
                    HAVING ${value} 
                    ORDER BY SUM(od.quantity) DESC NULLS LAST, p.updated_date DESC`)
}

//Best Selling
Product.showBestSelling = () => {
    return db.query(`SELECT p.id, p.name, p.price, p.old_price, p.image, EXTRACT(DAY FROM (CURRENT_TIMESTAMP - p.updated_date)) as newproduct, COUNT(p.id), SUM(od.quantity) 
                    FROM products as p FULL OUTER JOIN order_details as od ON od.product_id = p.id 
                    GROUP BY p.id 
                    ORDER BY SUM(od.quantity) DESC NULLS LAST, p.updated_date DESC LIMIT 6`);
};

//Search product in administration
Product.searchProductAdmin = value => {
    return db.query(`SELECT p.id, p.name, p.price, p.for_gender, p.for_age, p.quantity, p.image, c.name as cat_name, su.name as sup_name, sh.name as shop_name 
                    FROM products as p INNER JOIN categories as c ON c.id = p.cat_id 
                                        INNER JOIN suppliers as su ON su.id = p.sup_id 
                                        INNER JOIN shops as sh ON sh.id = p.shop_id 
                    WHERE ${value} 
                    ORDER BY p.updated_date DESC`);
};

module.exports = { Product };