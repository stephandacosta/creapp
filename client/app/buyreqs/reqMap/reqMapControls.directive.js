'use strict';

angular.module('creapp3App')
  .directive('reqMapControls', function ($timeout,$location, $compile, buyreqs) {
    return {
      templateUrl: 'app/buyreqs/reqMap/reqMapControls.html',
      restrict: 'E',
      scope: false
    };
  });
