'use strict';

angular.module('creapp3App')
  .directive('reqMapTab', function ($timeout, buyreqs, mapService) {
    return {
      restrict: 'E',
      link: function (scope, element) {

        scope.$watch(function(){
          return _.isEmpty(buyreqs.getSelectedReq());
        }, function(isEmpty){
          if (!isEmpty){
            mapService.addDetailMap(element[0], buyreqs.getSelectedReq());
          }
        });

        // invalidateSize because the map container size was dynamicaly changed by ng-material
        $timeout(function(){mapService.invalidateSize(); },200);

      }
    };
  });
