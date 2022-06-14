import passportJWT from 'passport-jwt';
import config from "../config.js";
import connection from "../settings/database.js";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt
}

export const passportFunction = (passport)=>{
    passport.use(
        new JwtStrategy(options, (payload, done)=>{
            try {
                connection.query("SELECT `username`, `password` FROM `user` WHERE `username`='"+ payload.username +"' AND `password`='"+ payload.password +"'", (error,rows, fields)=>{
                    if(error){
                        console.log(error);
                    }
                    else{
                        const user  = rows;
                        if(user){
                            done(null, user);
                        }
                        else{
                            done(null, false);
                        }
                    }
                })
            }
            catch (e){
                console.log(e);
            }
        })
    )
}
