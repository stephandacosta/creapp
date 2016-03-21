'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ($scope, $rootScope, $http, $mdToast) {

    $scope.types=['Leisure','Retail','Office','Industrial','Mulitfamily','Land',];
console.log($rootScope.user.username);
    var emptyReq = {
      created: new Date,
      user: $rootScope.user.username,

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
      modes : L.FreeDraw.MODES,
      mode : L.FreeDraw.MODES.ALL,
      isDisabled : function(mode) {
          return !(mode & $scope.map.mode);
      },
      toggleMode : function(mode) {
        if ($scope.map.isDisabled(mode)) {
          // Enabled the mode.
          $scope.map.mode = $scope.map.mode | mode;
          return;
        }
        // Otherwise disable it.
        $scope.map.mode = $scope.map.mode ^ mode;
      },
      setModeOnly : function(mode) {
        $scope.map.mode = $scope.map.modes.view | mode; //change this
      }
    };


    $scope.addReq = function(){
      var parentEl = document.getElementById('addReqForm');
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
    }



  });
