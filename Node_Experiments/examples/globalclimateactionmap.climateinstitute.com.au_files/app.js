'use strict';

var ROOT_PATH;
var App = {};

var app = angular.module( 'myApp' , ['ngResource', 'myApp.filters', 'apiServices'] );



app.config(['$locationProvider', function($locationProvider) {
   //$locationProvider.html5Mode(true);
}]);

app.config(['$routeProvider', function($routeProvider, $location) {

    //$routeProvider.when('/home', {templateUrl: 'templates/tpl-home.html', controller: ContextController});
    $routeProvider.when('/map', {templateUrl: 'templates/tpl-spotlight.html', controller: MainController});
    $routeProvider.when('/map/:countryId', {templateUrl: 'templates/tpl-spotlight-detail.html', controller: MainController});
    $routeProvider.when('/map/:countryId/:detail', {templateUrl: 'templates/tpl-spotlight-detail.html', controller: MainController});
    $routeProvider.when('/context', {templateUrl: 'templates/tpl-context.html', controller: ContextController });
    $routeProvider.when('/criteria', {templateUrl: 'templates/tpl-criteria.html', controller: ContextController });
    $routeProvider.when('/methodology', {templateUrl: 'templates/tpl-methodology.html', controller: ContextController });
    $routeProvider.when('/actions', {templateUrl: 'templates/tpl-actions.html', controller: ActionsController });
    $routeProvider.when('/actions/:itemId', {templateUrl: 'templates/tpl-action-detail.html', controller: ActionsController });

    $routeProvider.otherwise({redirectTo: '/criteria'});
}]);