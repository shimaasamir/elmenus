/***
 Metronic AngularJS App Main Script
 ***/

/* Metronic App */
var myApp = angular.module("myApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngCookies"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
myApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
myApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/




/* Setup Rounting For All Pages */
myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/login");

    $stateProvider
    // Login
        .state('login', {
            url: "/login",
            templateUrl: "./login/login.html",
            data: {
                pageTitle: 'Login'
            },
            controller: "LoginCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'myApp',
                        files: [
                            'login/login.js'
                        ]
                    });
                }]
            }
        })
        .state('menu', {
            url: "/menu",
            templateUrl: "./menu/menu.html",
            data: {
                pageTitle: 'Menu'
            },
            controller: "MenuCtrl",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'myApp',
                        files: [
                            'menu/menu.js'
                        ]
                    });
                }]
            }
        })


}]);


/* Init global settings and run the app */
myApp.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view

}]);

myApp.directive("contenteditable", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function () {
                scope.$apply(read);
            });
        }
    };
});
//
// angular
//     .module('myApp.services', [])
//     .factory('Users', function ($http) {
//         return {
//             get: function () {
//                 console.log("inside function");
//                 return $http.get('/api/users.json');
//             }
//         };
//     });
