'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($state, $compile, $timeout, $location, buyreqs) {
    return {
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
                $state.go('^.detail',{id: req._id });
              }));
            });
          }
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            addHighlightedLayer(buyreqs.getSelectedReq());
          }
        });

        scope.$on('selectedReq:update',function(){
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            addHighlightedLayer(buyreqs.getSelectedReq());
          }
        });

        var addHighlightedLayer = function(req){
          if (highlightedLayer){
            polygonsLayer.removeLayer(highlightedLayer);
          }
          polygonsLayer.addLayer(highlightedLayer = L.polygon(req.polygons)
          .setStyle({color:'#E040FB', fillColor: '#E040FB'}));
        };

        scope.$watch(function(){
          return buyreqs.getHighlightedReq()._id;
        }, function(newID){
          if (newID){
            addHighlightedLayer(buyreqs.getHighlightedReq());
          }
        });

        var contained = function(container,containee){
          var sw=0, ne=1, x = 0, y = 1;
          return (container[sw][x] <= containee[sw][x]) &&
          (container[sw][y] <= containee[sw][y]) &&
          (container[ne][x] >= containee[ne][x]) &&
          (container[ne][y] >= containee[ne][y]);
        };

        map.on('load moveend', function(e) {
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
