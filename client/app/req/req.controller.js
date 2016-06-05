'use strict';

angular.module('creapp3App')
  .controller('reqCtrl', function ( appConstants, $scope, $mdMedia) {

    // main will be shared in child scopes
    $scope.main = {};

    // req holds the new or existing req being added/edited
    $scope.main.req = {};


    // hide sidenav on smaller screens
    $scope.main.openedSidenav = true;
    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.main.openedSidenav =  big;
    });

  });
