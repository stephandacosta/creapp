'use strict';

angular.module('creapp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl',
        sp: {
          authorize: {
            group: 'admins'
          }
        }
      });
  });
