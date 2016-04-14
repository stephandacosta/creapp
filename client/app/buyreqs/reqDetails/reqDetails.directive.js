'use strict';

angular.module('creapp3App')
  .directive('reqDetails', function ($state,$http) {
    return {
      templateUrl: 'app/buyreqs/reqDetails/reqDetails.html',
      restrict: 'E',
      scope: {
        req:'=req'
      },
      link: function (scope, element, attrs) {
        scope.editReq = function(req){
          $state.go('editreq', {edit: {editMode: true, editReq:req}});
        };
        if (scope.req && scope.req.user) {
          var url = '/api/users/' + scope.req.user;
          $http.get(url).then(response => {
            scope.user = response.data;
          })
          .catch(err => {console.log(err);});
        }
      }
    };
  });
