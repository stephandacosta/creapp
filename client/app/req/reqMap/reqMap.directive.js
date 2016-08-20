'use strict';

angular.module('creapp3App')
  .directive('reqMapedit', function ($timeout,$location,$state, $compile, buyreqs, $rootScope, geosearchService) {
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

        $rootScope.$on('manualmode:all', function(){
          scope.draw.setMode('all');
        });

        $rootScope.$on('manualmode:edit', function(){
          scope.draw.setMode('edit');
        });

        $rootScope.$on('zoom:in', function(){
          map.zoomIn();
        });

        $rootScope.$on('zoom:out', function(){
          map.zoomOut();
        });

        //create map
        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        var searchLayer = L.layerGroup().addTo(map);
        var processSearchResults = function(obj){
            console.log(obj);
            if (obj[0].geojson.coordinates[0][0].length>=3){
              map.panTo([obj[0].lat, obj[0].lon]);
              var searchedGeoJson = obj[0].geojson.coordinates;
              searchedGeoJson.forEach(function(geoarray){
                var latlngs = geoarray[0].map(function(lnglat){
                  return [lnglat[1],lnglat[0]];
                });
                searchLayer.addLayer(L.polygon(latlngs, {className:'searchresult'})
                .setStyle({color:'rgba(0, 150, 136, 0.78)', fillColor: 'rgba(0, 150, 136, 0.78)'}));
                // .on('click', function(e) {
                //   searchLayer.clearLayers();
                // .on('click contextmenu', function(e) {
                //   $state.go('^.detail',{id: req._id });
                // }));
                // map.fitBounds( obj[0].boundingbox<LatLngBounds> bounds, <fitBounds options> options? )
              });
            } else {
              map.panTo([obj[0].lat, obj[0].lon]);
              L.marker([obj[0].lat, obj[0].lon]).bindPopup('<div>marker popoup</div>').openPopup().addTo(map);
              // marker.bindPopup(popupContent).openPopup();
            }
        };
        var processSearchError = function(obj){
          console.log(obj);
        };
        geosearchService.registerMapSearchProcessor(processSearchResults);



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
          $rootScope.$broadcast('mode:'+scope.draw.mode);
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
