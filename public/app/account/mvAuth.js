angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if (response.data.success) {
                    var user = new mvUser();
                    angular.extend(user, response.data.user);// that will take the data that comes back from the HTTP post and add it into the user object that we created.
                    mvIdentity.currentUser = user; //here, we just set the current user equal to that user object.
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout: true}).then(function() {
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized('admin')) {
                console.log("here");
                return true;
            } else {
                console.log("here");
                return $q.reject('not authorized');
            }
        }

    };
});
