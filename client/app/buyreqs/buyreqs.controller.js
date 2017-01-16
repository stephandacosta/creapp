'use strict';

angular.module('creapp3App')
  .filter('checkmark', function(){
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  .controller('BuyreqsCtrl', function (appConstants, $rootScope, $timeout, $scope, $filter, $mdComponentRegistry, $mdMedia, $mdToast, buyReqs, mapService, mapBoundsService, brokerService, filterService) {
    console.log('buyreqscontrol');
    //add mdMedia service for use in template via ngStyle
    $scope.$mdMedia = $mdMedia;

    $scope.types = appConstants.creTypes;

    console.log(brokerService);

    $scope.owners = brokerService.brokerOptions;

    $scope.search = filterService.search;

    $scope.main = {
      buyReqs: buyReqs,
      filteredReqs: buyReqs
    };

    $scope.highlightReq = function(req){
      // mapService.addHighlightedLayer(req);
      $scope.main.highlightedReq = req;
      req.hover = true;
    };
    //
    $scope.unhighlightReq = function(req){
      // mapService.removeHighlightedLayer();
      delete $scope.main.highlightedReq;
      req.hover = false;
    };


    //filters
    var typematch = function(item){
      return ((filterService.search.type==='Any') ? true : angular.equals(item.type,filterService.search.type) );
    };


    var ownermatch = function(item){
      if (filterService.search.owner==='Any'){
        return true;
      } else {
        return angular.equals(item.user,brokerService.brokerId);
      }
    };

    var createTestReqInBounds = function(bounds){
      return function(req){
        var _bounds = bounds;
        return req.polygon.some(function(point){
          return (point[0] >= _bounds[0][0] && point[0] <= _bounds[1][0]
          && point[1] >= _bounds[0][1] && point[1] <= _bounds[1][1]);
        });
      };
    };

    var createMapFilter = function(bounds){
      var testReqInBounds = createTestReqInBounds(bounds);
      var mapfilter = function(item){
        return (!(filterService.search.mapfilter) ? true : testReqInBounds(item));
      };
      return mapfilter;
    };

    var applyFilters = function(){
      var filtered = $scope.main.buyReqs;
      if(filterService.search.owner !=='Any'){
        filtered = $filter('filter')(filtered, ownermatch);
      }
      if(filterService.search.type !=='Any'){
        filtered = $filter('filter')(filtered, typematch);
      }
      if (filterService.search.mapfilter){
        var mapfilter = createMapFilter(mapBoundsService.getListBounds());
        filtered = $filter('filter')(filtered, mapfilter);
      }
      $scope.main.filteredReqs = filtered;
      // filteredReqs is watched in map directive
    };

    $scope.$watchCollection('search', function() {
      applyFilters();
    });


    $scope.$watchCollection(function(){
      return mapBoundsService.getListBounds();
    }, function(){
      applyFilters();
    });

    $scope.showfilter = false;
    $scope.openfilter = function(){
      $scope.showfilter = !$scope.showfilter;
    };

    $scope.toggleMapFilter = function(){
      filterService.search.mapfilter = !filterService.search.mapfilter;
    };

    $scope.showMap = false;
    $scope.toggleMap = function(){
      $scope.showMap = !$scope.showMap;
      if ($scope.showMap){
        $timeout(function(){mapService.invalidateSize(); },200);
      }
    };

    //
    // $scope.toggleProfile = angular.noop;
    // $mdComponentRegistry
    //   .when('left')
    //   .then( function(sideNav){
    //     $scope.toggleProfile = angular.bind(sideNav, sideNav.toggle );
    // });
    //

    var clipboard = new Clipboard('#sharebutton');
    clipboard.on('success', function(e) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('link has been copied to your clipboard, paste it anywhere')
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    });


  });
