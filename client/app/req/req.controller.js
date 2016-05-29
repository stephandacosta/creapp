'use strict';

angular.module('creapp3App')
  .controller('reqCtrl', function ( appConstants, $scope, $mdMedia) {

    // list of available types
    $scope.main = {};
    $scope.main.req = {};

    // hide sidenav on smaller screens
    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.openedSidenav =  big;
    });

  });
