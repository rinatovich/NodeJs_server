
const home = (req,res)=>{
    res.render('index.ejs', {title: 'Home', active: 'main'});
}

const login = (req,res)=>{
    res.render('login.ejs',{title: 'Log in',active: 'login'});

}
const register = (req,res)=>{
    res.render('register.ejs',{title: 'Register',active: 'register'});
}

const indexController = {
    home: home,
    login: login,
    register: register
}

export default indexController;