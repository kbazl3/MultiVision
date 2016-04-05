var mongoose = require('mongoose');
var crypto = require('crypto');

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
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    // Passport only implements authentication and not authorization, so we'll have to do our authorization by hand. Our authorization implementation is going to follow the standard method of using roles. So, we're going to give our
    // users roles. By default, the user will be a standard user unless they have the role of admin, in which case, they'll be an admin. We'll do that by going over to our
    //  Mongoose file and, inside of the schema, we're going to add another property to our users. This is going to be their roles. We're going to keep our implementation
    //   simple. We're just going to give our users an array of strings that indicates which roles that they have. And this syntax is how we indicate that to Mongoose.

    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };
    var User = mongoose.model('User', userSchema); //create user model based on user schema

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'joe');
            User.create({firstname: 'Joe', lastname: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});//joe is given the 'admin' role
            salt = createSalt();
            hash = hashPwd(salt, 'john');
            User.create({firstname: 'John', lastname: 'Papa', username: 'john', salt: salt, hashed_pwd: hash, roles: []});
            salt = createSalt();
            hash = hashPwd(salt, 'kb');
            User.create({firstname: 'Kyle', lastname: 'Bas', username: 'kb', salt: salt, hashed_pwd: hash});
        }
    });
};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}
