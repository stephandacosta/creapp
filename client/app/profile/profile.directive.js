'use strict';

angular.module('creapp3App')
  .directive('profile', function ($mdDialog) {
    return {
      templateUrl: 'app/profile/profileView.html',
      restrict: 'E',
      scope: {
        user: '=user',
        buyreq: '=buyreq'
      },
      link: function (scope, element, attrs) {
        // if (scope.user=='me'){
        //   // scope.user
        // } else {
        //   // scope.user =
        // }

        scope.showMailForm = function(ev){
          $mdDialog.show({
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true,
            templateUrl:'app/mailForm/mailForm.html',
            locals: {
              userId: scope.user.userId,
              brokerName: scope.user.fullName,
              buyreqId: scope.buyreq._id,
              buyreqTitle: scope.buyreq.title
            },
            controller: 'mailFormCtrl'
          });
        };

      }
    };
  });
