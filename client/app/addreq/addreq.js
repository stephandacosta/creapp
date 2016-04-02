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
        controller: 'AddreqCtrl',
        sp: {
          authenticate: true
        }
      })
      .state('editreq', {
        params: {edit: {
          editMode : true,
          editReq : null
        }},
        templateUrl: 'app/addreq/addreq.html',
        controller: 'AddreqCtrl',
        sp: {
          authenticate: true
        }
      });
  });
