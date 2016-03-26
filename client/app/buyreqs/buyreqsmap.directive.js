'use strict';

angular.module('creapp3App')
  .directive('buyreqsmap', function ($timeout) {
    return {
      restrict: 'C',
      scope: false,
      link: function link(scope, element) {

        var map = new L.Map(element[0]).setView(scope.map.initCenter, 10);
        L.tileLayer(scope.map.tileUrl, {
          attribution: scope.map.attribution
        }).addTo(map);

        scope.$watchCollection('buyreqs', function(){
          if (scope.buyreqs) {
            scope.buyreqs.forEach(function(req){
              req.polygons.forEach(function(polygon){
                var renderedPolygon = L.polygon(polygon).addTo(map);
                renderedPolygon.bindPopup(req.title);
              });
            });
          }
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){map.invalidateSize(); },200);

      }
    };
  });
