import express from "express";
import bodyParser from "body-parser";
import {route} from './settings/routes.js'

const app = express();
const port = 3500;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

route(app);

app.listen(port, ()=>{
    console.log('App listens on port 3500');
})