'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ( appConstants, $scope, $rootScope, $http, $mdToast, $mdSidenav, $mdMedia, $state, $stateParams) {

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

    //funciton to show toasts
    var showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
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
      // post req to server then drop toast
      $http.post('/api/buyreqs', $scope.req).then(function(){
        showToast('Your requirement was saved !');
        $scope.req = _.cloneDeep(emptyReq);
        $state.go('myreqs');
      }, function(){
        showToast('There was an issue in saving your requisition');
      });
    };

    // save req changes
    $scope.saveEdit = function(){
      // put req to server then drop toast
      $http.put('/api/buyreqs/' + $scope.req._id, $scope.req).then(function(){
        showToast('Your requirement edits were saved !');
        $scope.req = _.cloneDeep(emptyReq);
        $state.go('myreqs');
      }, function(){
        showToast('There was an issue in saving your edits');
      });
    };

    $scope.deleteReq = function(){
      $http.delete('/api/buyreqs/' + $scope.req._id).then(function(){
        showToast('Your requirement was deleted !');
        $scope.req = _.cloneDeep(emptyReq);
        $state.go('myreqs');
      }, function(){
        showToast('There was an issue deleting your requisition');
      });
    };

    // clear all for button click
    $scope.cancel = function(){
      $scope.req = _.cloneDeep(emptyReq);
      showToast('No changes were made');
      $state.go('myreqs');
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
