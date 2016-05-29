'use strict';

angular.module('creapp3App')
  .directive('reqMapEditControls', function ($timeout,$location, $compile, buyreqs) {
    return {
      templateUrl: 'app/req/reqMap/reqMapControls.html',
      restrict: 'E',
      scope: false
    };
  });
