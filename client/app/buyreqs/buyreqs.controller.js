'use strict';

angular.module('creapp3App')
  .filter('checkmark', function(){
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  .controller('BuyreqsCtrl', function (appConstants, $scope, $http, $filter, $mdMedia, $state, $stateParams, $mdComponentRegistry) {

    $scope.types= appConstants.creTypes;

    $scope.search = {
      type: 'Any',
      max_price:undefined,
      min_sqft:undefined
    };

    $scope.map = {
      tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      initCenter: [37.4259332,-122.3413094],
    };

    var mapId = function(reqs){
      if (reqs===undefined) {
        return [];
      } else {
        return reqs.map(function(req){
          return req._id;
        });
      }
    };

    var getAdditionalReqs = function (newReqs, oldReqs){
      // console.log('newReqs', newReqs);
      // console.log('oldReqs', oldReqs);
      // console.log('additionalReqs', _.difference(mapId(newReqs),mapId(oldReqs)).length);

      return _.difference(mapId(newReqs),mapId(oldReqs));
    };

    var updateMaxValues = function(){
      $scope.max_price = Math.max(...$scope.buyreqs.map(function(req){return req.max_price;}));
      $scope.min_sqft = Math.max(...$scope.buyreqs.map(function(req){return req.min_sqft;}));
    }

    var restoreFilterParams = function(){
      $scope.search.max_price=$scope.max_price;
      $scope.search.min_sqft=$scope.min_sqft;
    }

    var getBuyReqs = function(search){
      // update mongo query object map bounds
      var query = {};
      query.centers = {
        $geoWithin: {
          $box: [
            search.bounds[0],
            search.bounds[1]
          ]
        }
      };
      if (search.brokerId && $state.current.name==='userreqs'){
        query.user = search.brokerId;
      }
      // get data from server
      var url = $state.current.name==='myreqs' ? '/api/buyreqs/myreqs': '/api/buyreqs';
      $http.get(url, {params: { query }}).then(response => {

        //stored additional reqs queried if any
        var additionalReqs = getAdditionalReqs(response.data,$scope.buyreqs);

        // update reqs in view
        $scope.buyreqs = response.data;

        // to log for seeding
        // $scope.buyreqs.forEach(function(req){
        //   req.centers = req.polygons.map(function(polygon){
        //     var center = L.polygon(polygon).getBounds().getCenter();
        //     return [center.lat, center.lng];
        //   });
        // });
        // console.log($scope.buyreqs);

        // update max price and sqft in map bounds
        // there is a bug to be fixed in 1.0 https://github.com/angular/material/issues/4371
        updateMaxValues();

        // restore filter params if additional reqs are in map
        // if (additionalReqs.length){
          restoreFilterParams();
        // }

        // apply filters
        applyFilters();

      });
    };

    // $scope.$watchCollection('search.zipCodes',function(newValue, oldValue){
    //   if (!(angular.equals(newValue,oldValue))) {
    //     getBuyReqs($scope.search);
    //   }
    // });

    var max_price = function(item){
      return ($scope.search.max_price===(0 || undefined) ? true : item.max_price <= $scope.search.max_price);
    };

    var min_sqft = function(item){
      return ($scope.search.min_sqft===(0 || undefined) ? true : item.min_sqft <= $scope.search.min_sqft);
    };

    var typematch = function(item){
      return (($scope.search.type==='Any') ? true : angular.equals(item.type,$scope.search.type) );
    };

    var applyFilters = function(){
       var filtered;
       filtered = $filter('filter')($scope.buyreqs,{_id:$scope.search.reqID});
       filtered = $filter('filter')(filtered, typematch);
      //  filtered = $filter('filter')(filtered, max_price);
      //  filtered = $filter('filter')(filtered, min_sqft);
       $scope.filteredReqs = filtered;
       $scope.$emit('filter:update');
    }

    $scope.zoomIn = function(){
      $scope.$emit('zoom:in');
    };
    $scope.zoomOut = function(){
      $scope.$emit('zoom:out');
    };

    $scope.$watchCollection('search', function() {
      applyFilters();
    });

    $scope.$on('map:moved', function(event){
      event.stopPropagation();
      if ($scope.map.bounds) {
        $scope.search.bounds=$scope.map.bounds;
        getBuyReqs($scope.search);
      }
    });

    $scope.selected = {};

    $scope.toggle=function(req){
      if ($scope.search.reqID === req._id) {
        $scope.selected = {};
        $scope.search.reqID = '';
      } else {
        $scope.selected = req;
        $scope.search.reqID = req._id;
      }
    }
    // getBuyReqs($scope.search);

    $scope.showfilter = false;
    $scope.openfilter = function(){
      $scope.showfilter = !$scope.showfilter;
    };


    $scope.toggleProfile = angular.noop;
    $mdComponentRegistry
      .when('left')
      .then( function(sideNav){
        $scope.toggleProfile = angular.bind(sideNav, sideNav.toggle );
    });


    if ($stateParams.brokerId){
      $scope.search.brokerId = $stateParams.brokerId;
      // use resolve at router ?
      var url = '/api/users/' +$stateParams.brokerId;
      $http.get(url).then(response => {
        $scope.broker = response.data;
        $scope.toggleProfile();
      });
    }


  });
