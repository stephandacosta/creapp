'use strict';

angular.module('creapp3App')
  .directive('profile', function ($mdDialog, pictureuploadService) {
    return {
      templateUrl: 'app/profile/profileView.html',
      restrict: 'E',
      scope: {
        broker: '=user',
        buyreq: '=buyreq'
      },
      link: function(scope,el,attrs){
        scope.myprofile = attrs.myprofile;

        if (attrs.edit!==undefined){
          scope.edit=true;
        } else {
          scope.edit=false;
        }

        scope.$watch(function(){
          return scope.broker===undefined;
        }, function(isUndef){
          if (!isUndef){
            if (scope.broker.userId){
              var userId = scope.broker.userId
            } else {
              var userId = scope.broker.href.substr(scope.broker.href.lastIndexOf('/') + 1);
            }
            scope.brokerpic = pictureuploadService.getBrokerPicLink(userId);
          }
        });

        scope.getDefaultPic = function(img){
          //avoid infinite loop
          img.onerror=null;
          // set default image
          scope.brokerpic = '../../assets/images/user-default.png';
        };
      }
    };
  });
