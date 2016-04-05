var mongoose = require('mongoose');
var encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required:'{PATH} is required!'},
    lastName: {type: String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required:'{PATH} is required!'},
    hashed_pwd: {type: String, required:'{PATH} is required!'},
    roles: [String]
});
// Passport only implements authentication and not authorization, so we'll have to do our authorization by hand. Our authorization implementation is going to follow the standard method of using roles. So, we're going to give our
// users roles. By default, the user will be a standard user unless they have the role of admin, in which case, they'll be an admin. We'll do that by going over to our
//  Mongoose file and, inside of the schema, we're going to add another property to our users. This is going to be their roles. We're going to keep our implementation
//   simple. We're just going to give our users an array of strings that indicates which roles that they have. And this syntax is how we indicate that to Mongoose.

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role) {
        return this.roles.indexOf(role) > -1;
    }
};
var User = mongoose.model('User', userSchema); //create user model based on user schema

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'joe');
            User.create({firstName: 'Joe', lastName: 'Eames', username: 'joe', salt: salt, hashed_pwd: hash, roles: ['admin']});//joe is given the 'admin' role
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'john');
            User.create({firstName: 'John', lastName: 'Papa', username: 'john', salt: salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'kb');
            User.create({firstName: 'Kyle', lastName: 'Bas', username: 'kb', salt: salt, hashed_pwd: hash});
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
