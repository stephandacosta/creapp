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
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
    .primaryPalette('teal')
    .accentPalette('purple');
  })

  // stormpath init
  .run(function($stormpath){
    $stormpath.uiRouter({
      loginState: 'login',
      defaultPostLoginState: 'main'
    });
  })

  .constant('appConstants', {
    creTypes:['Any','Retail','Office','Leisure','Multifamily','Hotel','Senior Housing','Industrial','Health Care','Land','Agricultural', 'Other'],
    emptyReq : {
      // created: new Date,

      type: '',
      title: '',
      info: '',

      landOnly: false,
      landWithProperty: false,

      min_sqft: undefined,
      max_sqft: undefined,

      buy: false,
      buy_min_price: undefined,
      buy_max_price: undefined,

      exchange: false,
      exchange_min_price: undefined,
      exchange_max_price: undefined,

      lease: false,
      lease_min_price: undefined,
      lease_max_price: undefined,

      polygons: [],
      centers: [],
      // active: true
    }
  });
