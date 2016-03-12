'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addreq', {
        url: '/addreq',
        templateUrl: 'app/addreq/addreq.html',
        controller: 'AddreqCtrl'
      });
  });
