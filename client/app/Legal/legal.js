'use strict';

angular.module('creapp3App')
  .config(function ($stateProvider) {
    $stateProvider
      .state('legal', {
        url: '/legal',
        templateUrl: 'app/legal/legal.html',
      });
  })
  .directive('tcs', function () {
    return {
      templateUrl: 'app/legal/tcs.html',
      restrict: 'E',
    };
  })
  .directive('privacy', function () {
    return {
      templateUrl: 'app/legal/privacy.html',
      restrict: 'E',
    };
  })
  .directive('copyright', function () {
    return {
      templateUrl: 'app/legal/copyright.html',
      restrict: 'E',
    };
  });
