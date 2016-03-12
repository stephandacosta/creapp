'use strict';

angular.module('creapp3App')
  .controller('AddreqCtrl', function ($scope, $rootScope, $http) {
    $scope.message = 'Hello';

    $scope.types=['Land','Leisure','Retail','Office','Industrial','Mulitfamily'];

    console.log($rootScope.user);

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
      $http.post('/api/buyreqs', $scope.req).then(function(){
        console.log('it worked');
      }, function(){
        console.log('it failed');
      });
      $scope.req = _.cloneDeep(emptyReq);
    }


  });
