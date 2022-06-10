import express from 'express'
import path from 'path'
import {requestTime, logger} from "./middlewares.js";
import router from "./routes/servers.js";


const __dirname = path.resolve();
const PORT = process.env.PORT ?? 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'templates'));

app.use(express.static(path.resolve(__dirname, 'static')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(requestTime);
app.use(router);


app.get('/', (req,res)=>{
    res.render('index', {title: 'Main page', active: 'main'});
})
app.get('/login', (req,res)=>{
    res.render('login', {title: 'Login',active: 'login'});
})

// app.get('/',(req,res)=>{
//    res.sendFile(path.resolve(__dirname, 'templates', 'index.html'));
// });
//
app.get('/registration',(req,res)=>{
    res.render('registration',{title: 'Registration',active: 'registration'});
})

app.listen(PORT, ()=>{
    console.log("server has been started");
});
