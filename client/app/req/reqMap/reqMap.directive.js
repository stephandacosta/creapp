'use strict';

angular.module('creapp3App')
  .directive('reqMapedit', function ($timeout,$location, $compile, buyreqs) {
    return {
      template: '<div></div>',
      restrict: 'EA',
      scope: {
        req: '=req',
        map: '=map'
      },
      link: function (scope, element) {

        if ($location.absUrl().indexOf('localhost')===-1){
          L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images';
        }

        // this class is needed for css to work
        element.addClass('reqmap');

        //create map
        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
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

        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap(),
            position: 'topleft',
            showMarker: true,
            retainZoomLevel: true,
        }).addTo(map);
        //
        // var geocodeProvider = new L.GeoSearch.Provider.OpenStreetMap();
        //   // addressText = 'Amsterdam';
        //   console.log(geocodeProvider);
        //
        // geocodeProvider.GetLocations( '95121', function ( data ) {
        //   // in data are your results with x, y, label and bounds (currently availabel for google maps provider only)
        //   console.log(data);
        // });

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
          console.log(eventData);
          // do something on mode change
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
          console.log('new req', scope.req);
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

        // when sidenav updates, need to recenter map
        scope.$watch('openedSidenav',function(newvalue,oldvalue){
          if (oldvalue!==undefined || newvalue !==undefined){
            var offset = newvalue ? 160 : -160;
            $timeout(function(){
              map.panBy([offset, 0], {duration: 0.3});
            },200);
          }
        });

        // hook for button mode change from controller
        scope.$watch('map.mode',function(){
          freeDraw.setMode(scope.map.mode);
        });

        // clear polygons when req polygons have been cleared
        scope.$watch('req.polygons.length',function(newValue){
          if (!newValue){
            freeDraw.clearPolygons();
          }
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
