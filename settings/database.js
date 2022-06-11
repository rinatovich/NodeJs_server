import mysql from 'mysql';


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'users'
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