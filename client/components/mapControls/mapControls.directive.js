'use strict';

angular.module('creapp3App')
  .directive('mapControls', function ($rootScope, $state, geosearchService) {
    return {
      templateUrl: 'components/mapControls/mapControls.html',
      restrict: 'E',
      link: function(scope, attrs, elem){

        // scope.direction = $mdMedia('xs') ? 'up' : 'down';
        // scope.isOpen = false;
        scope.state=$state.current.name;

        scope.geoSearch = function(){
          geosearchService.showInput();
        };

        scope.zoomIn = function(){
          $rootScope.$broadcast('zoom:in');
        };
        scope.zoomOut = function(){
          $rootScope.$broadcast('zoom:out');
        };

        scope.setMode = function(mode){
          $rootScope.$broadcast('manualmode:' + mode);
        };



      }
    };
  });
