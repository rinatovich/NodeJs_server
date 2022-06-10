import mysql from 'mysql'


export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users',
    port: 3306
})

connection.connect((error)=>{
    if(error){
        console.log("Data Base Connection Error");
    }
    else{
        console.log("Data Base Connected Successful");
    }
})


