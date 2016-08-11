'use strict';

angular.module('creapp3App')
  .directive('mapControls', function (geosearchService) {
    return {
      templateUrl: 'components/mapControls/mapControls.html',
      restrict: 'E',
      link: function(scope, attrs, elem){

        // scope.direction = $mdMedia('xs') ? 'up' : 'down';
        // scope.isOpen = false;

        scope.geoSearch = function(){
          geosearchService.showInput();
        };

        scope.zoomIn = function(){
          console.log('zoom');
          // map.zoomIn();
        };
        scope.zoomOut = function(){
          console.log('zoom');
          // map.zoomOut();
        };
      }
    };
  });
