'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('profile.view', {
        url: '/view',
        templateUrl: 'app/profile/profileView.html',
        // controller: 'ProfileCtrl',
        // sp: {
          // authenticate: true
        // }
      })
      .state('profile.edit', {
        url: '/edit',
        templateUrl: 'app/profile/profileEdit.html',
        // controller: 'ProfileCtrl',
        // sp: {
          // authenticate: true
        // }
      });
  });
