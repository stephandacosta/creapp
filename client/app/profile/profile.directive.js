'use strict';

angular.module('creapp3App')
  .directive('profile', function ($mdDialog) {
    return {
      templateUrl: 'app/profile/profileView.html',
      restrict: 'E',
      scope: {
        user: '=user',
        buyreq: '=buyreq'
      }
    };
  });
