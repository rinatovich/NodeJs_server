import response from "../response.js";
import connection from "../settings/database.js";
import jwt from 'jsonwebtoken';
import config from './../config.js'


const getAllUsers = (req,res) =>{

    connection.query('SELECT `id`, `username`, `last_log`, `reg_time`, `status` FROM `user`',(error,rows,fields)=>{
        if(error){
            console.log("Data Base error");
            response(400,rows,res);
        }
        else{
            response(200,rows,res);
        }
    });

}

const signup = (req,res)=>{
    console.log(req.body);
    connection.query("SELECT `email`,`username` FROM `user` WHERE `email`='"+ req.body.email +"' AND `username` = '"+ req.body.username +"'",(error, rows, fields)=>{
        if(error){
            response(400, error, res);
        }
        else if(typeof rows !== 'undefined' && rows.length > 0){
            const row = JSON.parse(JSON.stringify(rows));
            row.map(rw => {
                response(302, {message: `User with that email ${rw.email} already exists!`},res);
                return true;
            })
        }
        else{
            let active = 'active';
            const time = `${req.requestDate.day}.${req.requestDate.month}.${req.requestDate.year}_${req.requestDate.time}`
            const sql = "INSERT INTO `user`(`username`, `email`, `status`, `reg_time`, `last_log`, `password`) VALUES('"+req.body.username+"','"+req.body.email+"','"+ active +"','"+ time +"','"+ time +"','"+ req.body.password +"')";
            connection.query(sql,(error, results)=>{
                if(error){
                    response(400, error, res);
                }
                else{
                    response(200,{message: `Registration successfully`,results},res);
                }
            });
        }
    })
}
const signin = (req,res)=>{
    connection.query("SELECT `username`, `password` FROM `user` WHERE `username`= '"+ req.body.username +"' AND `password`= '"+ req.body.password +"'", (error, rows, fields)=>{
        if(error){
            response(400, error, res);
        }
        if(rows.length <= 0){
            response(401, {message:`User with name ${req.body.username} is not found`},res);
        }else{
            const row = JSON.parse(JSON.stringify(rows));
            row.map(rw=>{
                const token = jwt.sign({
                    username: rw.username,
                    password: rw.password
                }, config.jwt, { expiresIn: 120 *120});
                response(200, {token: `Bearer ${token}`},res);
                return true;
            })
        }
    })
}


const usersController = {
    getAllUsers: getAllUsers,
    signup: signup,
    signin: signin
}
export default usersController;