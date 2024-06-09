const sql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const env = process.env;
const pool = sql.createPool({host:env.MYSQL_HOST,user:env.MYSQL_USER,password:env.MYSQL_PASSWORD,database:env.MYSQL_DATABASE,connectTimeout: 600000});


module.exports = pool;