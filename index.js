var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'; //environment variable to determine in production mode or development mode.

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express') (app, config);

require('./server/config/mongoose') (config);

var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({username:username}).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }
));

passport.serializeUser(function(user, done) {
    if(user) {
        done(null, user._id);
    }
});

passport.deserializeUser(function(id, done) {
    User.findOne({_id:id}).exec(function(er, user) {
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
});

require('./server/config/routes') (app);

console.log(env);

app.listen(config.port, function() {
    console.log("listening on " + config.port);
});
