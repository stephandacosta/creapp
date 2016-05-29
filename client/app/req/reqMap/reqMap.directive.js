'use strict';

angular.module('creapp3App')
  .directive('reqMapedit', function ($timeout,$location,$state, $compile, buyreqs) {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: {
        req: '=req',
        openedSidenav: '=openedSidenav'
      },
      link: function (scope, element, attrs) {


        var currentState = $state.current.name;

        if ($location.absUrl().indexOf('localhost')===-1){
          L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images';
        }

        // this class is needed for css to work
        element.addClass('reqmap');

        // map settings
        scope.map = {
          tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          initCenter: [37.4259332,-122.3413094],
          MODES: L.FreeDraw.MODES,
          mode : L.FreeDraw.MODES.VIEW,
          setMode : function (mode) {
            var modemap={
              edit: (scope.map.MODES.EDIT | scope.map.MODES.DELETE),
              all: scope.map.MODES.ALL
            };
            scope.map.mode = modemap[mode];
          }
        };

        // hook for button mode change from controller
        scope.$watch('map.mode',function(){
          freeDraw.setMode(scope.map.mode);
        });

        //create map
        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        // add geosearch plugin
        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap(),
            position: 'topleft',
            showMarker: true,
            retainZoomLevel: true,
        }).addTo(map);


        var mapEditControls = L.Control.extend({
          options: {
            //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
            position: 'topleft'
          },
          onAdd: function (map) {
            var container = L.DomUtil.create('div', 'mapcontrols');
            angular.element(container).append($compile('<req-map-edit-controls></req-map-edit-controls>')(scope));
            return container;
          }
        });
        map.addControl(new mapEditControls());

        scope.zoomIn = function(){
          map.zoomIn();
        };
        scope.zoomOut = function(){
          map.zoomOut();
        };
        // clear polygons for button click
        scope.clearPolygons = function(){
          scope.req.polygons = [];
          scope.req.centers = [];
          freeDraw.clearPolygons();
        };



        //create freedraw object
        var freeDraw = new L.FreeDraw();
        // these are options available
        //freeDraw.options.setEvents(['mousedown', 'mouseup', 'dblclick']);
        //freeDraw.options.setHullAlgorithm(false);
        //freeDraw.options.allowMultiplePolygons(false);
        //freeDraw.options.destroyPreviousPolygon(true);
        //freeDraw.options.exitModeAfterCreate(false);

        // when mode change need to update controller scope
        freeDraw.on('mode', function modeReceived(eventData) {
          // mode change
          if (scope.map.mode !== eventData.mode){
            scope.map.mode = eventData.mode;
            scope.$apply();
          };
        });

        // when there is a new polygon, add it to scope
        // this fires on zoom as well
        freeDraw.on('markers', function getMarkers(eventData) {
          if (eventData.latLngs.length) {
            scope.req.polygons = eventData.latLngs.map(function(polygon){
              return polygon.map(function(point){
                return [point.lat, point.lng];
              });
            });
            scope.req.centers = scope.req.polygons.map(function(polygon){
              var center = L.polygon(polygon).getBounds().getCenter();
              return [center.lat, center.lng];
            });
          }
        });

        // add freedraw object to the map
        map.addLayer(freeDraw);

        // on edit mode set predefined polygons
        // there is some bug here where polygons are joined together
        // need fix
        if (scope.req) {
          scope.req.polygons.forEach(function(polygon){
            var latLngs = [];
            polygon.forEach(function(point){
              latLngs.push(L.latLng(point[0], point[1]));
            });
            freeDraw.predefinedPolygon(latLngs);
          });
        }

        scope.openSidenav = function(){
          scope.openedSidenav = !scope.openedSidenav;
        };

        // when sidenav updates, need to recenter map
        // scope.$watch('openedSidenav',function(newvalue,oldvalue){
        //   if (oldvalue!==undefined || newvalue !==undefined){
        //     var offset = newvalue ? 160 : -160;
        //     $timeout(function(){
        //       map.panBy([offset, 0], {duration: 0.3});
        //     },200);
        //   }
        // });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
