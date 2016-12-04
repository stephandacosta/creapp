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
      controller: function($scope){

        var userId;

        $scope.$watch(function(){
          return $scope.broker===undefined;
        }, function(isUndef){
          if (!isUndef){
            if ($scope.broker.userId){
              userId = $scope.broker.userId
            } else {
              userId = $scope.broker.href.substr($scope.broker.href.lastIndexOf('/') + 1);
            }
            $scope.brokerpic = pictureuploadService.getBrokerPictureLink(userId);
          }
        });

        $scope.getDefaultPic = function(img){
          //avoid infinite loop
          if (arguments.length>0){
            img.onerror=null;
          }
          // set default image
          $scope.brokerpic = '../../assets/images/user-default.png';
          $scope.$apply();
        };

      }
    };
  });
