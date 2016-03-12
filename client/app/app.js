'use strict';

angular.module('creapp3App', [
  'creapp3App.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMaterial',
  'ui.router',
  'stormpath',
  'stormpath.templates'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');
    $locationProvider.html5Mode(true);
  })

// material theme pallette
  // .config(function($mdThemingProvider) {
  //   $mdThemingProvider.theme('default')
  //     .primaryPalette('pink')
  //     .accentPalette('orange');
  // });

  // stormpath init
  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'main'
    });
  });
