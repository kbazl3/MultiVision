var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    stylus = require('stylus'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');


module.exports = function(app, config) {
function compile(str, path) {
    return stylus(str).set('filename', path);
}

app.set('views', config.rootPath + '/server/views'); //set the views property to the path where i'm going to hold my views.
app.set('view engine', 'jade'); //set the view engine
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); //try commenting this line out if shit doesn't work
app.use(bodyParser.json());
app.use(session({secret: 'multi vision unicorns', resave: false, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(stylus.middleware( //configuring stylus middleware
    {
        src: config.rootPath + '/public',
        compile: compile
    }
));
app.use(express.static(config.rootPath + '/public'));

};
