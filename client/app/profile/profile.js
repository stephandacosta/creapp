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
        templateUrl: 'app/profile/myProfile.html',
        sp: {
          authenticate: true
        }
      })
      .state('profile.edit', {
        url: '/edit',
        templateUrl: 'app/profile/profileEdit.html',
        sp: {
          authenticate: true
        }
      });
  });
