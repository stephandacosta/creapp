'use strict';

angular.module('creapp')
  .directive('reqFilter', function () {
    return {
      templateUrl: 'app/buyreqs/reqFilter/reqFilter.html',
      restrict: 'E'
    };
  });
