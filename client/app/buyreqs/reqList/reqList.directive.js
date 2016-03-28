'use strict';

angular.module('creapp3App')
  .directive('reqList', function () {
    return {
      templateUrl: 'app/buyreqs/reqList/reqList.html',
      restrict: 'E',
      link: function (scope, element, attrs) {

        scope.selected = {};

        scope.toggle=function(req){
          if (scope.search.reqID === req._id) {
            scope.selected = {};
            scope.search.reqID = '';
          } else {
            scope.selected = req;
            scope.search.reqID = req._id;
          }
        }



      }
    };
  });
