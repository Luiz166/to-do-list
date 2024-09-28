import mysql from "mysql";
import 'dotenv/config';

const conn = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

conn.connect((err) => {
    if (err){
        console.error('Erro ao conectar ao MySQL: ', err);
        return
    }
    console.log('Conectado ao MySQL');
})

export default conn;
