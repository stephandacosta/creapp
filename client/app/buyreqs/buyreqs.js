'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('buyreqs', {
        url: '/buyreqs',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('editreq', {
        url: '/editreq',
        templateUrl: 'app/buyreqs/buyreqs.html',
        controller: 'BuyreqsCtrl',
        sp: {
          authenticate: true
        }
      });
  });
