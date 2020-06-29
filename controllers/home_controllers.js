const User = require('../models/user');

module.exports.home = function(req, res){
    // return res.end('<h1> Welcome to the Home Page! </h1>');
    return res.render('home',{
        title: "CodeBook Home"
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('user-sign-in', {
        title: "Sign In"
   });
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/profile');
    }
    return res.render('user-sign-up', {
        title: "Sign Up"
    });
}

module.exports.profile = function(req, res){
    if(req.isAuthenticated()){
        return res.render('user-profile', {
            title: 'Profile : CodeBook'
        });
    }
    return res.render('user-sign-in', {
        title: "Sign In" 
    });
}

module.exports.createSession = function(req, res){
    // return res.end('<h1> Congrats! You have logged in successfully...');
    return res.redirect('/profile');
}

//Create an User

module.exports.createUser = function(req, res){
    if(req.body.password != req.body.confirm_password){
        // popup.alert({
        //     content: 'Both passwords should be same'
        // });
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding User in Signing Up');
            return;
        }
        if(!user){
            // req.body.password = bcrypt.hashSync(req.body.password, 10);
            User.create(req.body, function(err, user){
                if(err){
                    console.log('Error in creating User while Signing Up');
                    return;
                }

                return res.redirect('/sign-in');
            });
        }else{
            popup.alert({
                content: 'User is already registered. Please Sign In'
            });
            return res.redirect('back');
        }
    });
}


module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}