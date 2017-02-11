'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'app/auth/register/register.html',
        controller: 'RegisterCtrl'
      });
  });
