'use strict';

angular.module('creapp', [
  'creapp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ngMaterial',
  'ui.router',
  'stormpath',
  'stormpath.templates',
  'ngImgCrop',
  'gg.editableText',
  'angulartics',
  'angulartics.google.tagmanager'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
    .when('', '/browse')
    .when('/', 'browse')
    .otherwise('/browse');
    $locationProvider.html5Mode(true);
  })

// material theme pallette
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('purple');
  })

// do not hijack clicks on mobile (needed to leaflet clicks to be caught)
  .config(function($mdGestureProvider) {
    $mdGestureProvider.skipClickHijack();
  })

  // stormpath init
  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'buyreqs.browse.views'
    });
  });
