var auth = require('./auth');
var users = require('../controllers/users');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);
    
    app.get('/partials/*', function(req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);
    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    app.get('*', function(req, res) { //the * matches all routes.
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};
