import  Strategy  from 'passport-jwt'
import ext  from 'passport-jwt'
import db from './../settings/db'
import config from './../config'

const JwtStrategy = Strategy.Strategy;
const ExtractJwt = ext.ExtractJwt;
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt 
}

const module = passport => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                db.query("SELECT `id`, `email` FROM `users` WHERE `id` = '" + payload.userId + "'", (error, rows, fields) => {
                    if(error) {
                        console.log(error)
                    } else {
                        const user = rows
                        if(user) {
                            done(null, user)
                        } else {
                            done(null, false)
                        }
                    }
                })
            } catch(e) {
                console.log(e);
            }
        })
    )
}
export default module;