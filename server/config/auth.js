var passport = require('passport');

exports.authenticate = function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    var auth = passport.authenticate('local', function(err, user) {
        if (err) {return next(err);}
        if(!user) {res.send({success:false})}
        req.logIn(user, function(err) {
            if (err) {return next(err);}
            res.send({success:true, user: user});
        });
    });
    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
    if(!req.isAuthenticated()) { //checks whether or not the user is authenticated
        res.status(403); //checks whether or not the user is authenticated
        res.end();
    } else {
        next(); //Otherwise, we'll call "next"
    }
};

exports.requiresRole = function(role) {
    return function(req, res, next) {
        if (!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    };
};
