angular.module('myApp').controller('LoginCtrl', function ($rootScope, $scope, $http, $timeout, $state, $cookies) {
    // Users.get().then(function (msg) {
    //     $scope.msg = msg;
    // });

    $scope.users = [
        {
            "username": "admin",
            "password": "admin.123",
            "role": "admin"
        },
        {
            "username": "user",
            "password": "user.123",
            "role": "user"
        }
    ];
    $scope.error = false;
    $cookies.role = '';
    $scope.login = function () {

        for (var i in $scope.users) {
            if ($scope.username == $scope.users[i].username && $scope.password == $scope.users[i].password) {

                // Retrieving a cookie
                // var favoriteCookie = $cookies.myFavorite;
                // Setting a cookie
                $cookies.role = $scope.users[i].role;
                $scope.error = false;
                $state.go('menu')
                console.log($cookies.role)
            }
            else {

                $scope.error = true;
            }
        }

    }

});
