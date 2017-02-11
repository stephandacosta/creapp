'use strict';

angular.module('creapp')
  .directive('profileEdit', function ($rootScope, $timeout, pictureuploadService, fieldValidation) {
    return {
      templateUrl: 'app/profile/profileEdit.html',
      restrict: 'E',
      scope: {
        broker: '=user',
        edit: '=edit',
      },
      link: function(scope){

        var userId;
        scope.edit.hasPicStaged = false;
        scope.edit.deletePicture = false;


        scope.$watch(function(){
          return scope.broker===undefined;
        }, function(isUndef){
          if (!isUndef){
            console.log(scope.broker);
            if (scope.broker.userId){
              userId = scope.broker.userId;
            } else {
              userId = scope.broker.href.substr(scope.broker.href.lastIndexOf('/') + 1);
            }
            scope.brokerpic = pictureuploadService.getBrokerPictureLink(userId);
          }
        });

        scope.validate = function(value, fieldtype){
          return fieldValidation.validate(value, fieldtype);
        };

        scope.getDefaultPic = function(img){
          //avoid infinite loop
          if (arguments.length>0){
            img.onerror=null;
          }
          // set default image
          scope.brokerpic = '../../assets/images/user-default.png';
          scope.edit.hasPicStaged = false;
          $timeout(function(){
            scope.$apply();
          }, 20);
        };

        scope.deletePic = function(){
          scope.brokerpic = '../../assets/images/user-default.png';
          scope.edit.deletePicture = true;
          scope.edit.hasPicStaged = false;
        };

        scope.cancelPic = function(){
          if (scope.edit.hasPicStaged) {
            // reference picture back
            scope.brokerpic = pictureuploadService.getBrokerPictureLink(userId);
            scope.edit.hasPicStaged = false;
            scope.edit.deletePicture = false;
            document.getElementById('fileToUpload').value='';
            // check if previous picture has been garbage collected
          }
        };

        scope.cropForm = function(files){
          pictureuploadService.loadPictureForm(files);
          // need to clear te input to allow on change event to occur
          document.getElementById('fileToUpload').value='';
        };

        $rootScope.$on('croppedImage:change', function(){
          scope.brokerpic = pictureuploadService.getCroppedImage();
          scope.edit.hasPicStaged = true;
        });

      }
    };
  });
