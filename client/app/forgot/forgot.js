'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('forgot', {
        url: '/forgot',
        templateUrl: 'app/forgot/forgot.html',
        controller: 'ForgotCtrl'
      });
  });
