'use strict';

angular.module('creapp3App')
  .directive('reqDetails', function () {
    return {
      templateUrl: 'app/buyreqs/reqDetails/reqDetails.html',
      restrict: 'E',
      scope: {
        req:'=req'
      },
      link: function (scope, element, attrs) {
      }
    };
  });
