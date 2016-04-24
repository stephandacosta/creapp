'use strict';

angular.module('creapp3App')
  .directive('profile', function ($mdDialog) {
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

        scope.showMailForm = function(ev){
          $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            templateUrl:'app/mailForm/mailForm.html',
            locals: {
              userId: scope.user.userId,
              brokerName: scope.user.fullName
            },
            controller: 'mailFormCtrl'
          });
        };

      }
    };
  });
