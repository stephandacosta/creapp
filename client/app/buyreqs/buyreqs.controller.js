'use strict';

angular.module('creapp')
  .filter('checkmark', function(){
    return function(input) {
      return input ? '\u2713' : '\u2718';
    };
  })
  .controller('BuyreqsCtrl', function (appConstants, $rootScope, $timeout, $scope, $filter, $mdComponentRegistry, $mdMedia, $mdToast, buyReqs, mapService, mapBoundsService, brokerService, filterService, $mdDialog, $mdSidenav) {
    //add mdMedia service for use in template via ngStyle
    $scope.$mdMedia = $mdMedia;

    $scope.types = appConstants.creTypes;

    $scope.owners = brokerService.brokerOptions;

    $scope.search = filterService.search;

    $scope.main = {
      buyReqs: buyReqs,
      filteredReqs: buyReqs
    };

    $scope.highlightReq = function(req){
      // mapService.addHighlightedLayer(req);
      delete $scope.main.highlightedReq;
      $scope.main.filteredReqs.forEach(function(r){
        r.hover = false;
      });
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
          return (point[0] >= _bounds[0][0] && point[0] <= _bounds[1][0] &&
            point[1] >= _bounds[0][1] && point[1] <= _bounds[1][1]);
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

    // applyfilters on map bounds change
    $scope.$on('mapbounds:change', applyFilters);

    // mobile filter sidenav toggle
    $scope.toggleFilterSidenav = function(){
      $mdSidenav('filterSidenav').toggle();
    };

    // open filter selections
    $scope.toggleFilter = function($mdMenu, ev){
      $mdMenu.open(ev);
    };

    // select filter value then close filter selection
    $scope.filterSelect = function(field, value){
      $scope.search[field] = value;
      applyFilters();
      if ($mdComponentRegistry.get( 'filterSidenav')){
        $timeout(function(){
          $mdSidenav('filterSidenav').toggle();
        },500);
      }
    };

    // select map filter on/off
    $scope.toggleMapFilter = function(){
      filterService.search.mapfilter = !filterService.search.mapfilter;
    };

    // toggle map on mobile
    $scope.showMap = false;
    $scope.mapLeftPosition = '100vw';
    $scope.toggleMap = function(){
        $scope.showMap = !$scope.showMap;
        $scope.mapLeftPosition = '0';
        if ($scope.showMap){
          $scope.mapLeftPosition = '0';
          $timeout(function(){mapService.invalidateSize(); },100);
        } else {
          $scope.mapLeftPosition = '100vw';
        }

    };

    $scope.showProfile = function(ev){

      $mdDialog.show({
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: true,
        templateUrl:'app/buyreqs/reqDetails/reqBrokerDetails.html',
        locals: {
          broker: $scope.main.selectedReq.broker
        },
        controller: function($scope, broker){
          $scope.broker = broker;
          $scope.cancel = function(){
            $mdDialog.cancel();
          };
        }
      });
    };

    var clipboard = new window.Clipboard('#sharebutton');
    clipboard.on('success', function() {
      $mdToast.show(
        $mdToast.simple()
        .textContent('link has been copied to your clipboard, paste it anywhere')
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    });


  });
