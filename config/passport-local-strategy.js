const User = require('../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Authentication using Passport
passport.use(new LocalStrategy({
    usernameField: 'email'
}, function(email, password, done){
    //Find a user and establish Identity
    User.findOne({email: email}, function(err, user){
        if(err){ console.log(`Error in finding the User ${err}`); return done(err); }
        if(!user || user.password != password){
            console.log('Invalid Username or Password');
            return done(null, false);
        }
        return done(null, user);
    });
}));

//Serialize the user to decide which key is to be kept in the cookie

passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserialize the user from the key in the cookie

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log(`Error in finding the user ${err}`);
            return done(err);
        }
        return done(null, user);
    });
});

//Check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //If the user is signed in then pass the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //If the user is not signed in
    return res.redirect('/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the
        //views
        res.locals.user = req.user;
    }
    next();     
}

module.exports = passport;