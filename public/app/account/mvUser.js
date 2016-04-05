angular.module('app').factory('mvUser', function($resource) { //I'm going to bring in the resource dependency. And, I'll create a variable called "User Resource",
    var UserResource = $resource('/api/users/:id', {_id: "@id"}, {
        update: {method:'PUT',isArray:false}
    }); //which will be created by calling the resource function, passing in the URL to our users.
//And, that will be api/users and then the ID. And then, we'll tell Angular what the ID is. And now, we've got our resource created.
    UserResource.prototype.isAdmin = function() { //Let's add a new method to that resource that will tell whether or not that user is an admin.
        return this.roles && this.roles.indexOf('admin') > -1;//This will add the "is admin" method onto every instance of a user resource.
    };// And then, finally, we just return that resource object.
    return UserResource;
});
