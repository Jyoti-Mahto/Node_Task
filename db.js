import mysql from 'mysql2/promise'

const conn = await mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Jyoti@321",
    database: "registration"
})

export default conn
