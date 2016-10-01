'use strict';

angular.module('creapp3App')
  .controller('ProfileCtrl', function ($scope, $rootScope, $http, $mdToast, $user, $timeout, pictureuploadService) {

    $scope.userEdit = _.cloneDeep($user.currentUser);
    var userId = $user.currentUser.href.substr($user.currentUser.href.lastIndexOf('/') + 1);

    $scope.brokerpic = pictureuploadService.getBrokerPicLink(userId);
    $scope.canDeletePic = true;


    //function to show toasts
    var showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    };

    $scope.getDefaultPic = function(img){
      //avoid infinite loop
      img.onerror=null;
      // set default image
      $scope.brokerpic = '../../assets/images/user-default.png';
      $scope.canDeletePic = false;
    };

    $scope.deletePic = function(){
      pictureuploadService.deleteImageFromStorage();
      $rootScope.$on("deletePicture:success", function(){
        // var img = document.getElementById('brokerpic');
        $scope.brokerpic = '../../assets/images/user-default.png';
        $scope.canDeletePic = false;
        $timeout(function(){
          $scope.$apply();
        }, 20);
      });
    };

    $scope.upload = function(files){
      var file = files[0];
      if (!file.type.match(/image.*/)) {
        // this file is not an image.
        console.log('not an image')
      } else {
        var img = document.createElement("img");
        img.src = window.URL.createObjectURL(file);
        pictureuploadService.showPictureUpload(img.src);
      }
    };

    $scope.saveUserEdits = function(){
      if ($scope.canDeletePic){
        pictureuploadService.uploadImageToStorage();
      }
      $http.put('/api/users/', $scope.userEdit).then(function(res){
        $user.get()
        .then(function (user) {
          showToast('user profile successfully updated');
          // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
          location.reload();
        })
        .catch(function (error) {
          showToast('user profile successfully but problem retrieving from server');
        });
      }, function(err){
        showToast('there was a problem updating the profile');
      });
    };

    $rootScope.$on('croppedImage:change', function(){
      $scope.brokerpic = pictureuploadService.getCroppedImage();
      $scope.canDeletePic = true;
    });

    $scope.profileLink = location.host + '/broker/' + userId + '/list';

    var clipboard = new Clipboard('#shareProfile');
    clipboard.on('success', function(e) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('link has been copied to your clipboard, paste it anywhere')
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    });



  });
