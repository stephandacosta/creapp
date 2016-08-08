'use strict';

angular.module('creapp3App')
  .directive('mapControls', function ($timeout,$location, $compile, $mdMedia, buyreqs) {
    return {
      templateUrl: 'components/mapControls/mapControls.html',
      restrict: 'E',
      link: function(scope, attrs, elem){

        // scope.direction = $mdMedia('xs') ? 'up' : 'down';
        //
        // scope.isOpen = false;


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
