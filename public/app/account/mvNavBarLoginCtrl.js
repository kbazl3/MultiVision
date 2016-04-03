angular.module("app").controller("mvNavBarLoginCtrl", function($scope, $http, mvIdentity, mvNotifier, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                mvNotifier.notify("You have succesfully signed in!");
            } else {
                mvNotifier.notify("username/pw combo is wrong");
            }
        });
    };

});
