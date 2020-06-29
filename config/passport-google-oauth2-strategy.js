const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Tell passport to use a new Strategy for Google login
passport.use(new googleStrategy({
    clientID: "1074836738276-mkcmg48639k4sr2ql05kild6b9f844ti.apps.googleusercontent.com",
    clientSecret: "YXOGs-HuA4Yz281-5rkTjf20",
    callbackURL: "http://localhost:9000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done){
        //Find the user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in Google Strategy Passport', err);
                return;
            }
            console.log(profile);
            if(user){
                //if found, set the user as req.user
                return done(null, user);
            }else{
                //if not found, then create the user and set as req.user
                User.create({
                   name: profile.displayName,
                   email: profile.emails[0],
                   password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                    if(err){
                        console.log('Error in creating user Google Strategy Passport', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;