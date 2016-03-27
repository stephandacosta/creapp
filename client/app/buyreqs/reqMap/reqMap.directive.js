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
