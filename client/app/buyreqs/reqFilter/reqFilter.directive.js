'use strict';

angular.module('creapp3App')
  .directive('reqFilter', function () {
    return {
      templateUrl: 'app/buyreqs/reqFilter/reqFilter.html',
      restrict: 'E'
      // link: function (scope, element, attrs) {
        // bug to solve, md-slider model does not update but scope does
        // scope.$watch('search.sqft',function(newvalue){
        //   console.log('sqft in directive',newvalue);
        // });
      // }
    };
  });
