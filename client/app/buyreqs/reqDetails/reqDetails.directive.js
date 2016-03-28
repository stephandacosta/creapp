'use strict';

angular.module('creapp3App')
  .directive('reqDetails', function ($state) {
    return {
      templateUrl: 'app/buyreqs/reqDetails/reqDetails.html',
      restrict: 'E',
      scope: {
        req:'=req'
      },
      link: function (scope, element, attrs) {
        scope.editReq = function(req){
          $state.go('addreq', {edit: {editMode: true, editReq:req}});
        };
      }
    };
  });
