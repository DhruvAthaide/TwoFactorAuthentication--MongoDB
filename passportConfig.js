const localStrategy = require('passport-local').Strategy;
const {User} = require('./database.js');

exports.initializingPassport = (passport)=>{
    passport.use(new localStrategy({
        usernameField:'email',
        passwordField:'password'
    },
    async function (username,password,done){
        try{

            const user = await User.findOne({username});
    
            if(!user) return done(null, false);
    
            if(user.password !== password) return done(null, false);
            
            return done(null, user);
        }catch (error){
            return done(error, false);
        }
    })
    );
};