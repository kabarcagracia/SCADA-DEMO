const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt


passport.use('signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) =>{ 
    try {
        const user = await User.create({ email, password});
        return done(null, user);
    } catch (error) {
        done(error);
        
    }

}));
passport.use('login', new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    console.log("entre");
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if(user) {
            console.log("no hay");
            return done(null, false, { message: 'user not found' });
        }

        const validate = await user.isValidPassword(password);

        if(!validate){
            return done(null, false, {message: 'password wrong' });

         }
        return done(null, user, { message: 'login successfull' });
    } catch (error) {
        return done(error);
    }
}));

passport.use(new JWTStrategy({
    secretOrKey: 'topSecret',
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
}, async (token, done) => {
    try {
        return done(null, token.user)
    } catch (e) {
        done(error)
    }
}))