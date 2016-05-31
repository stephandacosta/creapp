'use strict';

angular.module('creapp3App')
  .filter('checkmark', function(){
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  .controller('BuyreqsCtrl', function (appConstants, $rootScope, $scope, $filter, $mdComponentRegistry, $mdMedia, buyreqs) {

    //add mdMedia service for use in template via ngStyle
    $scope.$mdMedia = $mdMedia;

    $scope.types= appConstants.creTypes;

    $scope.search = {
      type: 'Any'
    };

    $scope.map = {
      tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      initCenter: [37.4259332,-122.3413094],
    };

    $scope.main = {
      buyreqs: buyreqs.getBuyReqs(),
      selectedReq: buyreqs.getSelectedReq()
    };

    var typematch = function(item){
      return (($scope.search.type==='Any') ? true : angular.equals(item.type,$scope.search.type) );
    };

    var applyFilters = function(){
      var filtered = $scope.main.buyreqs;
      filtered = $filter('filter')(filtered, typematch);
      $scope.filteredReqs = filtered;
      $scope.$emit('filter:update');
    }

    $scope.$watchCollection('search', function() {
      applyFilters();
    });

    $scope.showfilter = false;
    $scope.openfilter = function(){
      $scope.showfilter = !$scope.showfilter;
    };


    $scope.$on('buyreqs:update', function() {
      $scope.main.buyreqs = buyreqs.getBuyReqs();
      applyFilters();
    });

    $scope.$on('selectedReq:update', function() {
      $scope.main.selectedReq = buyreqs.getSelectedReq();
    });


    $scope.toggleProfile = angular.noop;
    $mdComponentRegistry
      .when('left')
      .then( function(sideNav){
        $scope.toggleProfile = angular.bind(sideNav, sideNav.toggle );
    });

  });
