'use strict';

angular.module('creapp3App')
  .directive('profileEdit', function ($rootScope, $timeout, pictureuploadService) {
    return {
      templateUrl: 'app/profile/profileCard.html',
      restrict: 'E',
      scope: {
        broker: '=user',
        edit: '=edit',
      },
      link: function(scope,el,attrs){

        var userId;
        scope.edit.hasPicStaged = true;
        scope.edit.hasPicCommitted = true;

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

        var dirty = false;
        scope.validate = function(value, field){
          console.log(value, field);
          dirty = true;
          return value;
        };

        scope.getDefaultPic = function(img){
          //avoid infinite loop
          if (arguments.length>0){
            img.onerror=null;
          }
          // set default image
          scope.brokerpic = '../../assets/images/user-default.png';
          scope.edit.hasPicStaged = false;
          scope.edit.hasPicCommitted = false;
          $timeout(function(){
            scope.$apply();
          }, 20);
        };

        scope.deletePic = function(){
          if (scope.edit.hasPicCommitted){
            // delete picture from blob storage
            pictureuploadService.deleteImageFromStorage();
            $rootScope.$on("deletePicture:success", function(){
              // var img = document.getElementById('brokerpic');
              scope.brokerpic = '../../assets/images/user-default.png';
              scope.edit.hasPicStaged = false;
              scope.edit.hasPicCommitted = false;
              $timeout(function(){
                scope.$apply();
              }, 20);
            });
          }
        };

        scope.cancelPic = function(){
          if (scope.edit.hasPicStaged) {
            // reference picture back to default
            scope.getDefaultPic();
            document.getElementById('fileToUpload').value='';
            // check if previous picture has been garbage collected
          }
        };

        scope.upload = function(files){
          pictureuploadService.uploadPicture(files);
          // need to clear te input to allow on change event to occur
          document.getElementById('fileToUpload').value='';
        };

        $rootScope.$on('croppedImage:change', function(){
          scope.brokerpic = pictureuploadService.getCroppedImage();
          scope.edit.hasPicStaged = true;
          scope.edit.hasPicCommitted = false;
        });

      }
    };
  });
