'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ( appConstants, $scope, $rootScope, $http, $mdToast, $mdSidenav, $mdMedia, $stateParams) {

    // list of available types
    $scope.types=appConstants.creTypes;

    // and empty req to initialize
    var emptyReq = {
      // created: new Date,

      type: '',
      title: '',
      info: '',

      landOnly: false,
      landWithProperty: false,

      price: undefined,
      sqft: undefined,

      buy: false,
      exchange: false,

      polygons: [],
      centers: [],
      // active: true
    };

    // put empty req or req to edit in scope into scope
    if ($stateParams.edit.editMode){
      $scope.addmode = false;
      $scope.req = $stateParams.edit.editReq;
    } else {
      $scope.req = _.cloneDeep(emptyReq);
      $scope.addmode = true;
    }

    // map settings
    $scope.map = {
      tileUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
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

    // post the req
    $scope.addReq = function(){
      // other properties such as user, date creation are added server side
      // set up parent element where toast will drop from
      var parentEl = document.getElementsByTagName('addreq-form')[0];
      // post req to server then drop toast
      $http.post('/api/buyreqs', $scope.req).then(function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Your requirement was saved !')
            .position('top right')
            .parent(parentEl)
            .hideDelay(5000)
        );
        $scope.req = _.cloneDeep(emptyReq);
      }, function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('There was an issue in saving your requisition')
            .position('top right')
            .position(parentEl)
            .hideDelay(5000)
        );
      });
    };

    // save req changes
    $scope.saveEdit = function(){
      // set up parent element where toast will drop from
      var parentEl = document.getElementsByTagName('addreq-form')[0];
      // put req to server then drop toast
      $http.put('/api/buyreqs/' + $scope.req._id, $scope.req).then(function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('Your requirement edits were saved !')
            .position('top right')
            .parent(parentEl)
            .hideDelay(5000)
        );
        $scope.req = _.cloneDeep(emptyReq);
      }, function(){
        $mdToast.show(
          $mdToast.simple()
            .textContent('There was an issue in saving your edits')
            .position('top right')
            .position(parentEl)
            .hideDelay(5000)
        );
      });
    };


    // clear all for button click
    $scope.cleanReq = function(){
      $scope.req = _.cloneDeep(emptyReq);
    };

    // clear polygons for button click
    $scope.clearPolygons = function(){
      $scope.req.polygons = [];
      $scope.req.centers = [];
    };

    // hide sidenav on smaller screens
    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.openedSidenav =  big;
    });

    // open sidenav for button click
    $scope.openSidenav = function(){
      $scope.openedSidenav = !$scope.openedSidenav;
    };



  });
