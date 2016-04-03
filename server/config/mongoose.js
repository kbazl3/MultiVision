var mongoose = require('mongoose');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: {type: String, required: true}
    });
    var User = mongoose.model('User', userSchema); //create user model based on user schema

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'joe'});
            User.create({firstName: 'John', lastName: 'Papa', username: 'john'});
            User.create({firstName: 'Kyle', lastName: 'Bas', username: 'kb'});
        }
    });
};
