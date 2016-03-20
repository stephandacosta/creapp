'use strict';

angular.module('creapp3App')
  .directive('buyreqsmap', function () {
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
              if (req.polygon.length>0) { 
                var polygon = L.polygon(req.polygon).addTo(map);
                polygon.bindPopup(req.title);
              }
            });
          }
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        setTimeout(function(){map.invalidateSize(); },200);

      }
    };
  });
