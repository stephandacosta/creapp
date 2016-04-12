'use strict';

angular.module('creapp3App')
  .directive('profile', function () {
    return {
      templateUrl: 'app/profile/profileView.html',
      restrict: 'E',
      scope: {
        user: '=user'
      },
      link: function (scope, element, attrs) {
        console.log('scope', scope);
        console.log('scope.user in profile', scope.user);
        if (scope.user=='me'){
          // scope.user
        } else {
          // scope.user =
        }
      }
    };
  });
