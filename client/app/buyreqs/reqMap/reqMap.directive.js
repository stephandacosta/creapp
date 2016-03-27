'use strict';

angular.module('creapp3App')
  .directive('reqMap', function ($timeout) {
    return {
      restrict: 'E',
      scope: false,
      link: function (scope, element, attrs) {

        var map = new L.Map(element[0]).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);
        var polygonsLayer = L.layerGroup().addTo(map);

        scope.$watchCollection('buyreqs', function(){
          if (scope.buyreqs) {
            scope.buyreqs.forEach(function(req){
              polygonsLayer.addLayer(L.multiPolygon(req.polygons).bindPopup(req.title));
            });
          }
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
