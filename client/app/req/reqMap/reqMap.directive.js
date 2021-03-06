'use strict';

// import { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from 'FreeDraw';

angular.module('creapp')
  .directive('reqMapedit', function ($timeout, $state, freeDraw, geosearchService, mapService) {
    return {
      restrict: 'AE',
      scope: {
        req: '=req'
        // drawmode: '=drawmode'
      },
      link: function (scope, element, attrs) {

        var currentState = $state.current.name;

        // this class is needed for css to work
        element.addClass('reqmap');

        mapService.addMaptoElement(element[0], true);
        mapService.addFreeDraw();

        freeDraw.setMode('edit');

        // clear polygons for button click
        // scope.clearPolygons = function(){
        //   _.remove(scope.req.polygon);
        //   _.remove(scope.req.center);
        //   freeDraw.clearPolygons();
        // };


        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){
          mapService.invalidateSize();
          if (currentState === 'req.edit.views' &&  scope.req) {
            mapService.panTo(scope.req.center);
            // mapService.zoomOut();
            if (!_.isUndefined(scope.req.polygon) && scope.req.polygon.length>0){
              mapService.addFreeDrawLayer(scope.req);
            } else if (scope.req.radius>0){
              var radiusMeters = scope.req.radius*1000/0.621371;
              // **** could add popup with location on click or hover ?
              mapService.drawCircle(scope.req.center, radiusMeters, function(){});
            }
          } else {
            mapService.resetBounds();
          }
        },200);

      }
    };
  });
