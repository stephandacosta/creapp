'use strict';

angular.module('creapp3App')
  .controller('BuyreqsCtrl', function (appConfig, $scope, $http) {

    $scope.types= appConfig.creTypes;

    $scope.search = {
      type: 'Any',
      price:undefined,
      sqft:undefined
    };

    var getBuyReqs = function(search){
      var query = {};
      // if (search.zipCodes.length) {
      //   query.zipCodes = { $in:search.zipCodes};
      // }
      $http.get('/api/buyreqs', {params: { query }}).then(response => {
        $scope.buyreqs = response.data;
        $scope.maxPrice = Math.max(...$scope.buyreqs.map(function(req){return req.price;}));
        $scope.maxSqft = Math.max(...$scope.buyreqs.map(function(req){return req.sqft;}));
        if (!$scope.search.price) {
          $scope.search.price=$scope.maxPrice;
        }
        if (!$scope.search.sqft) {
          $scope.search.sqft=$scope.maxSqft;
        }
      });
    };

    // $scope.$watchCollection('search.zipCodes',function(newValue, oldValue){
    //   if (!(angular.equals(newValue,oldValue))) {
    //     getBuyReqs($scope.search);
    //   }
    // });

    $scope.maxprice = function(item){
      return ($scope.search.price===(0 || undefined) ? true : item.price <= $scope.search.price);
    };

    $scope.maxsqft = function(item){
      return ($scope.search.sqft===(0 || undefined) ? true : item.sqft <= $scope.search.sqft);
    };

    $scope.typematch = function(item){
      return (($scope.search.type==='Any') ? true : angular.equals(item.type,$scope.search.type) );
    };

    getBuyReqs($scope.search);


    $scope.map = {
      tileUrl : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      initCenter: [37.4259332,-122.3413094],
    };




  });
