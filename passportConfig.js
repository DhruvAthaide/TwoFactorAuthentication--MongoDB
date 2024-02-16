const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const { User } = require('./database.js');

exports.initializingPassport = (passport) => {
    passport.use(new localStrategy({
        usernameField: 'email', // Assuming you have an input with name="email" in your form
        passwordField: 'password',
    },
        async function (username, password, done) {
            try {
                const user = await User.findOne({ username });

                if (!user) return done(null, false);

                const isPasswordValid = await bcrypt.compare(password, user.password);

                if (!isPasswordValid) return done(null, false);

                return done(null, user);
            } catch (error) {
                return done(error, false);
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);

            done(null, user);
        } catch (error) {
            done(error, false);
        }
    });
};

exports.isAuthenticated = (req, res, next) => {
    if (req.user) return next();

    res.redirect("/login");
};
