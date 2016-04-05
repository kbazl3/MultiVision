angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser;
    if (!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
    }
    return {
        currentUser: currentUser,
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    };
});

// inside here we'll add a little bit of code to check for that bootstrapped user object. Now, the bootstrapped user object is a global variable that's available on the window,
// so the first thing I want to do is bring in a window dependency. Now, I can always just use the global variable window, but at test time, that means I've got to set up a global
// variable on my window object. It's much better to use Angular's dollar sign window service, which allows me to mock it when it comes time to test this object. So, I'm going to
// create the current user variable and I'll just leave its default value as undefined. And, then I'll check to see if the bootstrapped user object is available on the window. If
// that object does exist, I'm going to assign it to the current user. And now, down here we'll recreate the current user property. I simply set that to that current user variable.
// So, it will still be undefined if the bootstrapped user object doesn't exist, but if it does exist, then it will be the value of the bootstrapped user object.
