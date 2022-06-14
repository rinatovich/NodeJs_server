import indexController from '../controllers/indexController.js'
import usersController from "../controllers/userController.js";
import passport from 'passport';




const router = (app)=>{

    app.route('/').get(indexController.home);
    app.route('/register').get(indexController.register);
    app.route('/login').get(indexController.login);
    app.route('/api/users').post(usersController.getAllUsers);
    app.route('/api/auth/signup').post(usersController.signup);
    app.route('/api/auth/signin').get(usersController.signin);
}



export default router;