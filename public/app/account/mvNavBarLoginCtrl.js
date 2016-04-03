angular.module("app").controller("mvNavBarLoginCtrl", function($scope, $http) {
    $scope.signin = function(username, password) {
        $http.post('/login', {username:username, password:password}).then(function(response) {
            if (response.data.success) {
                console.log("Loged in!");
            } else {
                console.log("failed to login!");
            }
        });
    };

});
