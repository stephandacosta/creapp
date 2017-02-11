'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('reset', {
        url: '/reset?sptoken',
        templateUrl: 'app/auth/reset/reset.html',
        controller: 'ResetCtrl'
      });
  });
