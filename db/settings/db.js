import mysql from 'mysql'
import config from '../config'

const connection = mysql.createConnection({
    host: config.HOST,
    socketPath: config.SOCKET,
    port: config.PORT,
    user: config.DBUSER,
    password: config.DBPASSWORD,
    database: config.DBNAME
})

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения к БД!');
    } else {
        return console.log('Подлючение успешно!');
    }
})
export default connection;