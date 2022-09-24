// const promise = require('bluebird');
// const dotenv = require('dotenv')
// dotenv.config()

// // OVERRIDING DEFAULT PROMISE LIBRARY
// const options = {
//     promiseLib: promise,
//     query: (e) => {
//         console.log(e.query);
//     }
// };
// const pgp = require('pg-promise')(options);

// // SET UP THE CONNECTION STRING FOR THE DATABASE
// const connectionString = process.env.DATABASE_URL;
// const db = pgp(connectionString);

const dotenv = require('dotenv')
dotenv.config()

// const Pool = require('pg').Pool
// const db = new Pool({
//     user: process.env.USER,
//     host: process.env.HOST,
//     database: process.env.DATABASE,
//     password: process.env.PASSWORD,
//     port: 5432
// })

const { Pool } = require('pg');
const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = db;