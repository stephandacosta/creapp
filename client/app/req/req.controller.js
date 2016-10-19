'use strict';

angular.module('creapp3App')
  .controller('reqCtrl', function ( appConstants, $scope, $mdMedia, $rootScope) {

    // main will be shared in child scopes
    $scope.main = {};

    // req holds the new or existing req being added/edited
    $scope.main.req = {};


    // hide sidenav on smaller screens
    $scope.main.openedEditForm = true;
    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.main.bigScreen =  big;
    });

    // state of freedraw broadcasted from map and shared to mapcontrols via scope inheritance
    $scope.drawmode = '';
    $rootScope.$on('mode:31', function(){
      $scope.drawmode = 'drawing';
    });
    $rootScope.$on('mode:12', function(){
      $scope.drawmode = 'editing';
    });





  });
