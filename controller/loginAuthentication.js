const bcrypt = require('bcryptjs');
const passport = require('passport');
const UserData = require('../models/UserData');
const httpResponse = require('../utilities/httpResponse');

module.exports = {
    loginAuthentication: (req,res,next) => {
        passport.authenticate('local', (err, user, info) => {
            if(err) throw err
            if(!user) httpResponse(res, 200, false, 'Incorrect Username or Password', null )
            else {
                req.logIn(user,err => {
                    if (err) httpResponse(req, 500, false, 'Server Error', null)
                    else httpResponse(res, 200, true, 'User successfully login', req.user)
                })
            }
        })(req,res,next)
    }
}
