const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 9000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(express.urlencoded());

app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);

//Extract styles and scripts from subpages to layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//Setup the View Engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codebook',
    //TODO Change the secret before deployment in production mode
    secret: 'xyz',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (100 * 60 * 200)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//Use Express Router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in connecting to the server: ${err}`);
    }
    console.log(`Server is up and running on port ${port}`);
})