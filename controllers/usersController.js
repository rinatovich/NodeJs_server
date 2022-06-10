import {response} from "../response.js";
import {connection} from "../settings/db.js";

export const users = (req,res)=>{

    connection.query("SELECT * FROM `users`",(error, rows, fields) => {
        if(error){
            console.log(error);
        }
        else{
            response(rows,res);
        }
    })
}

export const add = (req,res)=>{
    const sql = "INSERT INTO `users`{`name`,`email`,`status`} VALUES()";
    console.log(req);
}
