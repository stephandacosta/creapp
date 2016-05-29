'use strict';

angular.module('creapp3App')
  .directive('reqDetails', function ($state,$http) {
    return {
      templateUrl: 'app/buyreqs/reqDetails/reqDetails.html',
      restrict: 'E',
      scope: {
        req: '=req'
      }
    };
  });
