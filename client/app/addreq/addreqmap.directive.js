'use strict';

angular.module('creapp3App')
  .directive('addreqmap', function () {
    return {
      restrict: 'C',
      scope: false,
      link: function link(scope, element) {

        var map = new L.Map(element[0]).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        var freeDraw = new L.FreeDraw({
            mode: scope.map.mode
        });

        //freeDraw.options.setEvents(['mousedown', 'mouseup', 'dblclick']);
        //freeDraw.options.setHullAlgorithm(false);
        //freeDraw.options.allowMultiplePolygons(false);
        //freeDraw.options.destroyPreviousPolygon(true);
        //freeDraw.options.exitModeAfterCreate(false);

        freeDraw.on('mode', function modeReceived(eventData) {
            scope.map.mode = eventData.mode;
            if (!scope.$root.$$phase) {
                scope.$apply();
            }

        });

        scope.$watch('map.mode', function modeReceived(mode) {
            freeDraw.setMode(mode);
        });

        freeDraw.on('markers', function getMarkers(eventData) {
            scope.req.polygon = eventData.latLngs[0].map(function(point){
              return [point.lat, point.lng];
            });
            console.log(scope.req.polygon);
            if (!scope.req.polygon.length){
              scope.map.mode = L.FreeDraw.MODES.ALL;
              scope.$apply();
            }
        });

        map.addLayer(freeDraw);

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        setTimeout(function(){map.invalidateSize(); },200);

      }
    };
  });
