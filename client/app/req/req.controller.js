'use strict';

angular.module('creapp3App')
  .controller('reqCtrl', function ( appConstants, $scope, $rootScope, $http, $mdToast, $mdSidenav, $mdMedia, $state, $stateParams) {

    // $scope.types=appConstants.creTypes;

    // list of available types
    $scope.main = {};
    $scope.main.req = {};

    // map settings
    $scope.map = {
      tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      initCenter: [37.4259332,-122.3413094],
      MODES: L.FreeDraw.MODES,
      mode : L.FreeDraw.MODES.VIEW,
      setMode : function (mode) {
        var modemap={
          edit: ($scope.map.MODES.EDIT | $scope.map.MODES.DELETE),
          all: $scope.map.MODES.ALL
        };
        $scope.map.mode = modemap[mode];
      }
    };

    // hide sidenav on smaller screens
    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.openedSidenav =  big;
    });

    // // clear polygons for button click
    // $scope.clearPolygons = function(){
    //   $scope.main.req.polygons = [];
    //   $scope.main.req.centers = [];
    // };

    //
    // $scope.zoomIn = function(){
    //   $scope.$emit('zoom:in');
    // };
    // $scope.zoomOut = function(){
    //   $scope.$emit('zoom:out');
    // };


  });
