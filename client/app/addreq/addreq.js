'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addreq', {
        url: '/addreq',
        params: {edit: {
          editMode : false,
          editReq : null
        }},
        templateUrl: 'app/addreq/addreq.html',
        controller: 'AddreqCtrl'
      });
  });
