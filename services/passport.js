const LocalStrategy = require('passport-local').Strategy;
const UserData = require ('../models/UserData');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
            try {
                const user = await UserData.findOne({ email: email })
                if (!user)  return done(null, false)
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) return done (null, user)
                    else return done(null, false)
                })
            } catch (err) {
                console.log(err)
                throw err
            }
        })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
        console.log('serial')
    });

    passport.deserializeUser((id, done) => {
        UserData.findById(id, (err,user) => {
            done(err, user);
            console.log('deseria')
        })
    });  
}