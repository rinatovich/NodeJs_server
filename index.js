import express from 'express'
import bodyParser from "body-parser";
import router from "./settings/routes.js";
import {requestTime} from "./middleware/middlewares.js";
import path from "path";
import cors from 'cors';
import passport from 'passport';
import passportMid from './middleware/passportMid.js';
import passportFunction from './middleware/middlewares.js'


const HOST = '127.0.0.1';
const __dirname = path.resolve();
const APP = express();
const PORT = process.env.PORT || 3000;


APP.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
APP.use(cors()) // Use this after the variable declaration
APP.use(requestTime);
APP.use(bodyParser.urlencoded({extended: true}));
APP.use(bodyParser.json());
APP.use(express.static(path.resolve(__dirname, 'static')));
APP.use(passport.initialize());
APP.use(passportMid);


passportFunction(passport);

APP.set('view_engine', 'ejs');
APP.set('views', path.resolve(__dirname,'templates'));

router(APP);

APP.listen(PORT, HOST,()=>{
    console.log(`App listen on port ${PORT}`);
})

export default  APP;