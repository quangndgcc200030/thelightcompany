const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CREATE USER
User.create = (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) => {
    return db.query(`INSERT INTO users (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) 
                    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
    [username, password, firstname, lastname, gender, birthdate, telephone, email, address, role]);
};

// GET ALL USER
User.get = () => {
    return db.query('SELECT * FROM users');
};

// UPDATE AN USER
User.updateprofile = (username, firstname, lastname, gender, birthdate, telephone, email, address) => {
    return db.query(`UPDATE users SET firstname = $2, lastname = $3, gender = $4, birthdate = $5, telephone = $6, email = $7, address = $8 WHERE username = $1`, [
        username, firstname, lastname, gender, birthdate, telephone, email, address
    ]);
};

// CHANGE A PASSWORD
User.changepassword = (username, password) => {
    return db.query(`UPDATE users SET password = $2 WHERE username = $1`, [username, password]);
};

// DELETE AN USER
User.delete = username => {
    return db.none(`DELETE FROM users WHERE username = $1`, [username]);
};

// FIND USER
User.findUser = username => {
    return db.query(`SELECT * FROM users WHERE username = $1 OR email = $1`, [username]);
};

// REGISTER USER
User.register = (username, telephone, email) => {
    return db.query(`SELECT * FROM users WHERE username = $1 OR telephone = $2 OR email = $3`, [username, telephone, email]);
};

module.exports = { User };