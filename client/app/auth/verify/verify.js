'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('verify', {
        url: '/verify?sptoken',
        templateUrl: 'app/auth/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });
