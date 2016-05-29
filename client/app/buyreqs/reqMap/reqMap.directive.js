'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($state, $compile, $timeout, $location, buyreqs) {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {



        if ($location.absUrl().indexOf('localhost')===-1){
          L.Icon.Default.imagePath = 'bower_components/leaflet/dist/images';
        }

        var map = new L.Map(element[0], {zoomControl:false, tap:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        new L.Control.GeoSearch({
            provider: new L.GeoSearch.Provider.OpenStreetMap(),
            position: 'topleft',
            showMarker: true,
            retainZoomLevel: true,
        }).addTo(map);

        var mapControls = L.Control.extend({
          options: {
            //control position - allowed: 'topleft', 'topright', 'bottomleft', 'bottomright'
            position: 'topleft'
          },
          onAdd: function (map) {
            var container = L.DomUtil.create('div', 'mapcontrols');
            angular.element(container).append($compile('<req-map-controls></req-map-controls>')(scope));
            return container;
          }
        });
        map.addControl(new mapControls());

        scope.zoomIn = function(){
          map.zoomIn();
        };
        scope.zoomOut = function(){
          map.zoomOut();
        };


        var polygonsLayer = L.layerGroup().addTo(map);
        var baseLayer, highlightedLayer;


        scope.$on('filter:update', function(event){
          event.stopPropagation();
          polygonsLayer.clearLayers();
          if (scope.filteredReqs) {
            scope.filteredReqs.forEach(function(req){
              baseLayer = polygonsLayer.addLayer(L.polygon(req.polygons)
              .setStyle({color:'#00695C', fillColor: '#009688'})
              .on('click contextmenu', function(e) {
                  // this does not work, need to fix
                  // e.target.setStyle({color:'#E91E63', fillColor: '#E91E63'});
                  // console.log(e);
                  $state.go('^.detail',{id: req._id });
                  // scope.$digest();
              }));
            });
          }
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            addHighlightedLayer();
          }
        });

        scope.$on('selectedReq:update',function(){
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            addHighlightedLayer();
          }
        });

        var addHighlightedLayer = function(){
          if (highlightedLayer){
            highlightedLayer.clearLayers();
          }
          highlightedLayer = polygonsLayer.addLayer(L.polygon(buyreqs.getSelectedReq().polygons)
          .setStyle({color:'#E040FB', fillColor: '#E040FB'}));
        };


        var contained = function(container,containee){
          var sw=0, ne=1, x = 0, y = 1;
          return (container[sw][x] <= containee[sw][x]) &&
          (container[sw][y] <= containee[sw][y]) &&
          (container[ne][x] >= containee[ne][x]) &&
          (container[ne][y] >= containee[ne][y]);
        };

        map.on('moveend', function(e) {
          var bounds = map.getBounds();
          buyreqs.updateBounds ([
            [bounds._southWest.lat, bounds._southWest.lng],
            [bounds._northEast.lat, bounds._northEast.lng]
          ]);
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
