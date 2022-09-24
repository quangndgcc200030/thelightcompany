const db = require("../../config/db");

// EMPTY OBJECT
// USED FOR EXPORTING THE FUNCTIONS BELOW
const User = {};

// CREATE USER
User.create = (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) => {
    return db.query(`INSERT INTO users (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [username, password, firstname, lastname, gender, birthdate, telephone, email, address, role]);
};

// GET ALL USER
User.get = () => {
    return db.query('SELECT * FROM users');
};

// UPDATE AN USER
User.update = (username, password, firstname, lastname, gender, birthdate, telephone, email, address, role) => {
    return db.none(`UPDATE users SET password = $2, firstname = $3, lastname = $4, gender = $5, birthdate = $6, telephone = $7, email = $8, address = $9, role = $10 WHERE username = $1`, [
        username, password, firstname, lastname, gender, birthdate, telephone, email, address, role
    ]);
};

// DELETE AN USER
User.delete = username => {
    return db.none(`DELETE from users WHERE username = $1`, [username]);
};

// FIND USER
User.findUser = username => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};

module.exports = { User };