'use strict';

angular.module('creapp3App')
  .directive('reqList', function () {
    return {
      templateUrl: 'app/buyreqs/reqList/reqList.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        scope.showfilter = false;
        scope.openfilter = function(){
          console.log('toggle');
          scope.showfilter = !scope.showfilter;
        };

      }
    };
  });
