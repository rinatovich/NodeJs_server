import response from "../response.js";
import connection from "../settings/database.js";



const users = (req,res) =>{

    connection.query('SELECT * FROM `users`',(error,rows,fields)=>{
        if(error){
            console.log("Data Base error");
        }
        else{
            response(rows,res);
        }
    });

}

const add = (req,res)=>{
    console.log(req.body.name);
    let active = 'active';
    const sql = "INSERT INTO `users`(`name`, `email`, `status`) VALUES('"+req.body.name+"','"+req.body.email+"','"+ active +"')";
    connection.query(sql,(error, results)=>{
        if(error){
            console.log("User add error");
        }
        else{
            response(results,res);
        }
    });
}



const usersController = {
    users: users,
    add: add
}
export default usersController;