'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($timeout) {
    return {
      template: '<div></div>',
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        var map = new L.Map(element[0], {zoomControl:false}).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);
        var polygonsLayer = L.layerGroup().addTo(map);

        scope.$on('zoom:out', function(){
          event.stopPropagation();
          map.zoomOut();
        });
        scope.$on('zoom:in', function(){
          event.stopPropagation();
          map.zoomIn();
        });

        scope.$on('filter:update', function(event){
          event.stopPropagation();
          polygonsLayer.clearLayers();
          if (scope.filteredReqs) {
            scope.filteredReqs.forEach(function(req){
              polygonsLayer.addLayer(L.multiPolygon(req.polygons)
              .on('click', function(e) {
                  // this does not work, need to fix
                  // e.target.setStyle({color:'#E91E63', fillColor: '#E91E63'});
                  // console.log(e);
                  scope.toggle(req);
                  scope.$digest();
              }));
            });
          }
        });

        var contained = function(container,containee){
          var sw=0, ne=1, x = 0, y = 1;
          return (container[sw][x] <= containee[sw][x]) &&
          (container[sw][y] <= containee[sw][y]) &&
          (container[ne][x] >= containee[ne][x]) &&
          (container[ne][y] >= containee[ne][y]);
        };

        map.on('moveend', function(e) {
          var bounds = map.getBounds();
          scope.map.bounds = [
            [bounds._southWest.lat, bounds._southWest.lng],
            [bounds._northEast.lat, bounds._northEast.lng]
          ];
          scope.$emit('map:moved');
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
