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
        var initialize;

        if ($location.absUrl().indexOf('localhost')===-1){
          L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images';
        }

        // this class is needed for css to work
        element.addClass('reqmap');

        // map settings
        scope.map = {
          tileUrl : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          initCenter: [37.4259332,-122.3413094]
        };

        // draw holds the freedraw mode that needs to be shared between controll buttons and map
        scope.draw = {
          MODES: L.FreeDraw.MODES,
          setMode : function (mode) {
            var modemap={
              edit: (scope.draw.MODES.EDIT | scope.draw.MODES.DELETE),
              all: scope.draw.MODES.ALL
            };
            scope.draw.mode = modemap[mode];
          },
          readMode : function(){
            if (scope.draw.mode === (scope.draw.MODES.EDIT | scope.draw.MODES.DELETE)) {return 'editing';}
            if (scope.draw.mode === scope.draw.MODES.ALL) {return 'drawing';}
          }
        };

        //create map
        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        // add geosearch plugin
        var geosearch = new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap(),
            position: 'topleft',
            showMarker: true,
            retainZoomLevel: true,
        }).addTo(map);

        // suffix United States
        geosearch._searchbox.oninput = function(){
          if (this.value === ', United States'){
            this.value = '';
          }
          if (this.value.length===1) {
            this.value = this.value + ', United States';
            if (this.createTextRange) {
              var part = this.createTextRange();
              part.move("character", 1);
              part.select();
            } else if (this.setSelectionRange){
              this.setSelectionRange(1, 1);
            }
              this.focus();
          }
        }


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
          _.remove(scope.req.polygons);
          _.remove(scope.req.centers);
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

        // hook for button mode change from controller
        scope.$watch('draw.mode',function(newMode,oldMode){
          freeDraw.setMode(newMode);
        });

        // when mode change need to update controller scope
        freeDraw.on('mode', function modeReceived(eventData) {
          // mode change
          if (eventData.mode === 1){
            freeDraw.setMode(31);
            $timeout(function(){scope.$digest();},0);
          } else if (eventData.mode === 29) {
            freeDraw.setMode(12);
            $timeout(function(){scope.$digest();},0);
          } else {
            // mode change
            if (scope.draw.mode !== eventData.mode){
              scope.draw.mode = eventData.mode;
              // scope.$digest();
            };
          }
        });

        // when there is a new polygon, add it to scope
        // this fires on zoom as well
        freeDraw.on('markers', function getMarkers(eventData) {
          if (eventData.latLngs.length && !initialize) {
            _.remove(scope.req.polygons);
            eventData.latLngs.forEach(function(polygon){
              scope.req.polygons.push(polygon.map(function(point){
                return [point.lat, point.lng];
              }));
            });
            _.remove(scope.req.centers);
            scope.req.polygons.forEach(function(polygon){
              var center = L.polygon(polygon).getBounds().getCenter();
              scope.req.centers.push([center.lat, center.lng]);
            });
          }
          if (eventData.latLngs.length === 0  && initialize) {
            initialize = false;
          }
        });

        // add freedraw object to the map
        map.addLayer(freeDraw);

        // on edit mode set predefined polygons
        if (currentState === 'req.edit' &&  scope.req) {
          initialize=true;
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
