'use strict';

// import { NONE, CREATE, EDIT, DELETE, APPEND, ALL, polygons } from 'FreeDraw';

angular.module('creapp3App')
  .directive('reqMapedit', function ($timeout,$location,$state, $compile, buyreqs, $rootScope, geosearchService, freeDraw, mapService) {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        req: '=req',
        drawmode: '=drawmode'
      },
      link: function (scope, element) {

        var currentState = $state.current.name;

        // this class is needed for css to work
        element.addClass('reqmap');

        mapService.addMaptoElement(element[0], true);
        mapService.addFreeDraw();

        // clear polygons for button click
        // scope.clearPolygons = function(){
        //   _.remove(scope.req.polygon);
        //   _.remove(scope.req.center);
        //   freeDraw.clearPolygons();
        // };


        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){mapService.invalidateSize(); },200);

      }
    };
  });
