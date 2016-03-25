'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ($scope, $rootScope, $http, $mdToast, $mdSidenav) {

    $scope.types=['Leisure','Retail','Office','Industrial','Mulitfamily','Land',];

    var emptyReq = {
      created: new Date,

      type: '',
      title: '',
      info: '',

      landOnly: false,
      landWithProperty: false,

      price: undefined,
      sqft: undefined,

      buy: false,
      exchange: false,

      zipCodes: [],
      polygon: [],
      active: true
    };

    $scope.req = _.cloneDeep(emptyReq);

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

    $scope.addReq = function(){
      //need to add user on submit because not available on load
      emptyReq.user=$rootScope.user.username;
      // set up parent element where toast will drop from
      var parentEl = document.getElementById('addReqForm');
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

    $scope.cleanReq = function(){
      $scope.req = _.cloneDeep(emptyReq);
    };

    $scope.clearPolygons = function(){
      $scope.req.polygon = [];
    };

    $scope.openSidenav = function(){
      $scope.openedSidenav = !$scope.openedSidenav;
    };



  });
