'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($state, $compile, $timeout, $location, buyreqs, mapService, geosearchService) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element) {

        mapService.addMaptoElement(element[0], true);
        mapService.addPolygonsLayer();

        scope.$on('filter:update', function(){
          // event.stopPropagation();
          mapService.clearLayers();
          if (scope.filteredReqs) {
            mapService.addBaseLayer(scope.filteredReqs);
          }
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            mapService.addHighlightedLayer(buyreqs.getSelectedReq());
          }
        });


        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){mapService.invalidateSize(); },200);

      }
    };
  });
