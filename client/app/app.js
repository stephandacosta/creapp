'use strict';

angular.module('creapp3App', [
  'creapp3App.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'stormpath',
  'stormpath.templates'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  // stormpath init
  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'main'
    });
  });
