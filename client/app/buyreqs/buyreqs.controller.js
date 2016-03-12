'use strict';

angular.module('creapp3App')
  .controller('BuyreqsCtrl', function ($scope, $http) {
    $scope.message = 'Hello';
    console.log('hello');
    $http.get('/api/buyreqs').then(response => {
      $scope.buyreqs = response.data;
    });
  });
