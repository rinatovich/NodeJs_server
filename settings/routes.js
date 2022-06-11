import indexController from '../controllers/indexController.js'
import usersController from "../controllers/userController.js";



const router = (app)=>{
    app.route('/').get(indexController.home);
    app.route('/register').get(indexController.register);
    app.route('/login').get(indexController.login);
    app.route('/users').get(usersController.users);
    app.route('/users/add').post(usersController.add);
}



export default router;