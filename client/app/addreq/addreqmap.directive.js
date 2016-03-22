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
            mode: L.FreeDraw.MODES.ALL
        });

        L.easyButton('<i class="material-icons" style="font-size: 19px;">edit_location</i>',function() {
          freeDraw.setMode(L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.DELETE);
        }).addTo(map);
        L.easyButton('<i class="material-icons" style="font-size: 19px;">edit</i>',function() {
          freeDraw.setMode(L.FreeDraw.MODES.ALL);
        }).addTo(map);



        //freeDraw.options.setEvents(['mousedown', 'mouseup', 'dblclick']);
        //freeDraw.options.setHullAlgorithm(false);
        //freeDraw.options.allowMultiplePolygons(false);
        //freeDraw.options.destroyPreviousPolygon(true);
        //freeDraw.options.exitModeAfterCreate(false);

        // freeDraw.on('mode', function modeReceived(eventData) {
        //   // do something on mode change
        // });


        freeDraw.on('markers', function getMarkers(eventData) {
          if (eventData.latLngs.length) {
            scope.req.polygon = eventData.latLngs[0].map(function(point){
              return [point.lat, point.lng];
            });
            // console.log('unset create');
            // freeDraw.unsetMode(L.FreeDraw.MODES.CREATE);
            // freeDraw.setMode(L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.DELETE);
          } else {
            freeDraw.setMode(L.FreeDraw.MODES.ALL);
            // freeDraw.unsetMode(L.FreeDraw.MODES.EDIT | L.FreeDraw.MODES.DELETE);
          }
        });

        map.addLayer(freeDraw);

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        setTimeout(function(){map.invalidateSize(); },200);

      }
    };
  });
