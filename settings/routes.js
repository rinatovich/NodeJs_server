import indexController from '../controllers/indexController.js'
import usersController from "../controllers/userController.js";
import passport from 'passport';




const router = (app)=>{

    app.route('/').get(indexController.home);
    app.route('/register').get(indexController.register);
    app.route('/login').get(indexController.login);
    app.route('/api/users').post(passport.authenticate('jwt', { session:false }), usersController.getAllUsers);
    app.route('/api/auth/signup').post(usersController.signup);
    app.route('/api/auth/signin').post(usersController.signin);
    app.route('/api/users/blockuser').post(passport.authenticate('jwt', { session:false }),usersController.blockUser);
    app.route('/api/users/unblockuser').post(passport.authenticate('jwt', { session:false }),usersController.unBlockUser);
    app.route('/api/users/removeuser').post(passport.authenticate('jwt', { session:false }),usersController.removeUser);
}



export default router;