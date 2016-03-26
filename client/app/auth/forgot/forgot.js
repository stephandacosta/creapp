'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'app/auth/forgot/forgot.html',
        controller: 'ForgotCtrl'
      });
  });
