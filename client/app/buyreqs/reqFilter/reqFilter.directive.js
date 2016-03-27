'use strict';

angular.module('creapp3App')
  .directive('reqFilter', function () {
    return {
      templateUrl: 'app/buyreqs/reqFilter/reqFilter.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
