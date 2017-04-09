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
    .accentPalette('purple', {
      'default': '800', // by default use shade 400 from the pink palette for primary intentions
      'hue-1': 'A400', // use shade 100 for the <code>md-hue-1</code> class
      'hue-2': '200', // use shade 600 for the <code>md-hue-2</code> class
      'hue-3': 'A700'
    });
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
