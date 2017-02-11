'use strict';

angular.module('creapp')
  .directive('reqMap', function ($state, $compile, $timeout, $location, mapService) {
    return {
      restrict: 'AE',
      scope: {
        filteredReqs : '=',
        selectedReq : '=',
        highlightedReq: '='
      },
      link: function (scope, element) {

        mapService.addMaptoElement(element[0], true);
        mapService.addPolygonsLayer();

        var addBaseLayer = function(reqs){
          if (reqs) {
            mapService.addBaseLayer(reqs);
          }
        };

        var addHighlightedLayer = function(req){
          if (req && Object.keys(req).length !== 0) {
            mapService.addHighlightedLayer(req);
          }
        };

        scope.$watch(function(){
          if (scope.highlightedReq){
            return scope.highlightedReq._id;
          }
        }, function(){
          addHighlightedLayer(scope.highlightedReq);
        });

        scope.$watchCollection('filteredReqs', function(reqs){
          addBaseLayer(reqs);
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){
          mapService.invalidateSize();
          if ($state.current.name === 'buyreqs.browse.views'){
            mapService.resetBounds();
            addBaseLayer(scope.filteredReqs);
            addHighlightedLayer(scope.highlightedReq);
          } else if (scope.selectedReq){
            mapService.fitToReq(scope.selectedReq);
            mapService.addHighlightedLayer(scope.selectedReq);
          }
        },200);

      }
    };
  });
