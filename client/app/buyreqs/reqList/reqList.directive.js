'use strict';

angular.module('creapp3App')
  .directive('reqList', function () {
    return {
      templateUrl: 'app/buyreqs/reqList/reqList.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
