import response from "../response.js";
import connection from "../settings/database.js";
import jwt from 'jsonwebtoken';
import config from './../config.js'


const getAllUsers = (req,res) =>{
    connection.query('SELECT `id`, `username`,`email`, `last_log`, `reg_time`, `status` FROM `user`',(error,rows,fields)=>{
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
                    console.log(req.body);
                    const token = jwt.sign({
                        username: req.body.username,
                        password: req.body.password
                    }, config.jwt, {expiresIn: 120 * 120});
                    response(200,{token: `Bearer ${token}`,message: `Registration successfully`,results},res);
                }
            });
        }
    })
}
const signin = (req,res)=> {
    connection.query("SELECT `username`, `password` FROM `user` WHERE `username`= '" + req.body.username + "' AND `password`= '" + req.body.password + "'", (error, rows, fields) => {
        if (error) {
            response(400, error, res);
        }
        if (rows.length <= 0) {
            response(401, {message: `User with is not found`}, res);
        }
        else {
            connection.query("SELECT `status` FROM `user` WHERE `username`= '" + req.body.username + "' AND `password`= '" + req.body.password + "'",(error,rows,fields)=>{
                if(error){
                    response(500, {message:"Cannot check status of the user"},res);
                }
                else{
                    const answer = JSON.parse(JSON.stringify(rows));
                    if(answer[0].status == 'active'){
                        const time = `${req.requestDate.day}.${req.requestDate.month}.${req.requestDate.year}_${req.requestDate.time}`
                        connection.query("UPDATE `user` SET `last_log` = '" + time + "' WHERE `username` = '" + req.body.username + "' AND `password` = '" + req.body.password + "'", (error, rows, fields) => {
                            if (error) {
                                response(500, "Cant update last login time field", res);
                            }
                            else{
                                // console.log(rows);
                            }
                        });
                        const row = JSON.parse(JSON.stringify(rows));
                        row.map(rw => {
                            const token = jwt.sign({
                                username: rw.username,
                                password: rw.password
                            }, config.jwt, {expiresIn: 120 * 120});
                            response(200, {username:rw.username, password:rw.password, token: `Bearer ${token}`}, res);
                            return true;
                        })
                    }else{
                        response(403, {message: "User is blocked"},res);
                    }
                }

            });
        }
    });
}

const blockUser = (req,res)=>{
    connection.query("UPDATE `user` SET `status`= 'blocked' WHERE `id` IN ("+ req.body.ids +")",(error,rows,fields)=>{
        if(error){
            response(501,error,res);
        }
        else{
            connection.query("SELECT * FROM `user` WHERE `id` IN ("+ req.body.ids +")",(error,rows,fields)=>{
                if(error){
                    response(500, error,res);
                }
                else{
                    let selfblock;
                    let rw = JSON.parse(JSON.stringify(rows));
                    for(let i=0; i<rw.length; i++){
                        if(rw[i].name==req.body.name && rw[i].password == req.body.password){
                            selfblock = true;
                        }
                    }
                    if(selfblock){
                        response(200, {selfblock: true},res);
                    }
                    else{
                        response(200,rw,res);
                    }
                }
            })
        }
    });
}

const unBlockUser = (req,res)=>{
    connection.query("UPDATE `user` SET `status`= 'active' WHERE `id` IN ("+ req.body.ids +")",(error,rows,fields)=>{
        if(error){
            response(501,error,res);
        }
        else{
            response(200,rows,res);
        }
    });
}
const removeUser = (req,res)=>{
    connection.query("SELECT * FROM `user` WHERE `id` IN ("+ req.body.ids +")",(error,rows,fields)=>{
        if(error){
            response(500, error,res);
        }
        else{
            let selfblock;
            let rw = JSON.parse(JSON.stringify(rows));
            for(let i=0; i<rw.length; i++){
                if(rw[i].name==req.body.name && rw[i].password == req.body.password){
                    selfblock = true;
                }
            }
            connection.query("DELETE FROM `user` WHERE `id` IN ("+ req.body.ids +")",(error,rows,fields)=>{
                if(error){
                    response(501,error,res);
                }
                else{
                    if(selfblock){
                        response(200, {selfblock: true},res);
                    }
                    else{
                        response(200,rw,res);
                    }
                }
            });
        }
    })
}



const usersController = {
    getAllUsers: getAllUsers,
    signup: signup,
    signin: signin,
    blockUser:blockUser,
    unBlockUser:unBlockUser,
    removeUser:removeUser
}
export default usersController;