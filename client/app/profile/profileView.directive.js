'use strict';

angular.module('creapp3App')
  .directive('profileView', function ($rootScope, pictureuploadService) {
    return {
      templateUrl: 'app/profile/profileCard.html',
      restrict: 'E',
      scope: {
        broker: '=user',
        buyreq: '=buyreq'
      },
      link: function(scope,el,attrs){

        var userId;

        scope.$watch(function(){
          return scope.broker===undefined;
        }, function(isUndef){
          if (!isUndef){
            if (scope.broker.userId){
              userId = scope.broker.userId
            } else {
              userId = scope.broker.href.substr(scope.broker.href.lastIndexOf('/') + 1);
            }
            scope.brokerpic = pictureuploadService.getBrokerPictureLink(userId);
          }
        });

        scope.getDefaultPic = function(img){
          console.log('default pic');
          //avoid infinite loop
          if (arguments.length>0){
            img.onerror=null;
          }
          // set default image
          scope.brokerpic = '../../assets/images/user-default.png';
          scope.edit.hasPicStaged = false;
          scope.edit.hasPicCommitted = false;
          scope.$apply();
        };

      }
    };
  });
