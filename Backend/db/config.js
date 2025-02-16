const mysql = require('mysql')
require('dotenv').config()

const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

con.connect((err)=>{
   if(err) console.log('connection error');
})

module.exports = con