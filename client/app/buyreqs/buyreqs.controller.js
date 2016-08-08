'use strict';

angular.module('creapp3App')
  .filter('checkmark', function(){
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  .controller('BuyreqsCtrl', function (appConstants, $rootScope, $scope, $filter, $mdComponentRegistry, $mdMedia, $mdToast, buyreqs) {

    //add mdMedia service for use in template via ngStyle
    $scope.$mdMedia = $mdMedia;

    $scope.types= appConstants.creTypes;

    $scope.search = {
      type: 'Any',
      mapfilter: false
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


    //filters
    var typematch = function(item){
      return (($scope.search.type==='Any') ? true : angular.equals(item.type,$scope.search.type) );
    };


    var createTestReqInBounds = function(bounds){
      return function(req){
        var _bounds = bounds;
        return req.polygons.some(function(polygon){
          return polygon.some(function(point){
            return (point[0] >= _bounds[0][0] && point[0] <= _bounds[1][0]
            && point[1] >= _bounds[0][1] && point[1] <= _bounds[1][1]);
          });
        });
      };
    };

    var createMapFilter = function(bounds){
      var testReqInBounds = createTestReqInBounds(bounds);
      var mapfilter = function(item){
        return (!($scope.search.mapfilter) ? true : testReqInBounds(item));
      };
      return mapfilter;
    }

    var applyFilters = function(){
      var mapfilter = createMapFilter(buyreqs.getBounds());
      var filtered = $scope.main.buyreqs;
      filtered = $filter('filter')(filtered, typematch);
      filtered = $filter('filter')(filtered, mapfilter);
      $scope.filteredReqs = filtered;
      $scope.$emit('filter:update');
    }

    $scope.$watchCollection('search', function() {
      applyFilters();
    });

    $scope.toggleMapFilter = function(){
      $scope.search.mapfilter = !$scope.search.mapfilter;
    }

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

    $scope.highlightReq = function(req){
      buyreqs.highlightReq(req);
      req.hover = true;
    };

    $scope.unhighlightReq = function(req){
      buyreqs.unhighlightReq();
      req.hover = false;
    };

    $scope.toggleProfile = angular.noop;
    $mdComponentRegistry
      .when('left')
      .then( function(sideNav){
        $scope.toggleProfile = angular.bind(sideNav, sideNav.toggle );
    });

    $scope.smallSmallMap = !$mdMedia('xs');
    if ($scope.smallSmallMap){
      $scope.mapSizeIcon = "zoom_out_map";
    } else {
      $scope.mapSizeIcon =   "picture_in_picture_alt";
    }
    $scope.toggleSmallSmallMap = function(){
      $scope.smallSmallMap = !$scope.smallSmallMap;
      if ($scope.smallSmallMap){
        $scope.mapSizeIcon = "zoom_out_map";
      } else {
        $scope.mapSizeIcon =   "picture_in_picture_alt";
      }
    };


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
