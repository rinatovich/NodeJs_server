import indexController from '../controllers/indexController.js'
import {users,add} from "../controllers/usersController.js";

export const route = (app)=>{



    app.route('/').get(indexController);
    app.route('/users').get(users);
    app.route('/users/add').post(add);
}
