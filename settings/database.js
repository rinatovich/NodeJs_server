import mysql from 'mysql';
import config from '../config.js';

const connection = mysql.createConnection({
    host: config.HOST,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    port: config.PORT,
    database: config.DBNAME
});

connection.connect((error)=>{
    if(error){
        console.log("Data base connection error");
    }
    else{
        console.log("Data base connected");
    }
});

export default connection;