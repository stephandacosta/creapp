'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login/login.html',
        controller: 'LoginCtrl'
      });
  });
