'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ($scope, $rootScope, $http, $mdToast) {

    $scope.types=['Land','Leisure','Retail','Office','Industrial','Mulitfamily'];

    var emptyReq = {
      // _reqId: new mongoose.Types.ObjectId,
      created: new Date,
      user: 'somedude@somemail.com',
      title: '',
      info: '',

      landOnly: false,
      landWithProperty: false,
      type: 'Agriculture',

      priceMin: undefined,
      priceMax: undefined,

      buy: false,
      lease: false,
      exchange: false,

      zipCodes: [],
      polygon: [],
      active: true
    };

    $scope.req = _.cloneDeep(emptyReq);

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
