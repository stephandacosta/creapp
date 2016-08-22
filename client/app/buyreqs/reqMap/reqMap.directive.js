'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($state, $compile, $timeout, $location, buyreqs, geosearchService) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        // map.locate({setView:true});
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
                .setStyle({color:'#e91e63', fillColor: '#e91e63'}));
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


        var polygonsLayer = L.layerGroup().addTo(map);
        var baseLayer, highlightedLayer, searchLayer;

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

        var polygonsBounds = function(polygons){
          var south,north,east,west;
          polygons.forEach(function(polygon){
            polygon.forEach(function(point){
              if (!south || point[0] < south ){
                south = point[0];
              }
              if (!north || point[0] > north ){
                north = point[0];
              }
              if (!east || point[1] < east ){
                east = point[1];
              }
              if (!west || point[1] > west ){
                west = point[1];
              }
            });
          });
          return [[south, west],[north, east]];
        };

        scope.$on('selectedReq:update',function(){
          if (Object.keys(buyreqs.getSelectedReq()).length !== 0) {
            var req = buyreqs.getSelectedReq();
            map.fitBounds(polygonsBounds(buyreqs.getSelectedReq().polygons));
            addHighlightedLayer(buyreqs.getSelectedReq());
          } else {
            map.fitBounds(lastBounds);
          }
        });

        scope.$on('zoom:in', function(){
          map.zoomIn();
        });

        scope.$on('zoom:out', function(){
          map.zoomOut();
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

        var lastBounds;
        map.on('load moveend', function(e) {
          var bounds = map.getBounds();
          var boundsArray = [
            [bounds._southWest.lat, bounds._southWest.lng],
            [bounds._northEast.lat, bounds._northEast.lng]
          ];
          if (!lastBounds || Object.keys(buyreqs.getSelectedReq()).length === 0) {
            lastBounds =  boundsArray.slice();
          }
          buyreqs.updateBounds (boundsArray);
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
