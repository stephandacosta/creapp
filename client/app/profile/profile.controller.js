'use strict';

angular.module('creapp3App')
  .controller('ProfileCtrl', function ($scope, $rootScope, $state, $http, $mdToast, $user, $auth, $timeout, pictureuploadService) {

    $scope.broker = $user.currentUser;
    var userId;

    var getUserId = function(){
      return $scope.broker.href.substr($scope.broker.href.lastIndexOf('/') + 1);
    };

    var resetEdits = function(){
      $scope.edit = {
        mode: false,
        broker : _.cloneDeep($user.currentUser),
        hasPicStaged : false,
        deletePicture : false
      };
      userId = getUserId();
    };

    resetEdits();

    $scope.editProfile = function(){
      $scope.edit.mode = true;
      $scope.broker = $scope.edit.broker;
      userId = getUserId();
    };

    $scope.viewProfile = function(){
      $scope.edit.mode = false;
      $scope.broker = $user.currentUser;
      userId = getUserId();
    };

    $scope.cancelEdits = function(){
      resetEdits();
      $scope.viewProfile();
    };



    var updatePicture = function () {
      if ($scope.edit.hasPicStaged){
        // case when a picture is staged and need to be updated on server
        pictureuploadService.uploadImageToStorage(function(success){
          if (success){
            console.log('picture resolved');
            $scope.broker.customData.hasPicture = true;
            saveUserEdits(true);
          } else {
            console.log('picture loading problem');
            // no change in customData.hasPicture property
            saveUserEdits(false);
          }
        });
      } else if ($scope.edit.deletePicture) {
        // case when a picture needs to be deleted on server
        pictureuploadService.deleteImageFromStorage(function(success){
          if (success){
            console.log('picture resolved');
            $scope.broker.customData.hasPicture = false;
            saveUserEdits(true);
          } else {
            console.log('picture loading problem');
            // no change in customData.hasPicture property
            saveUserEdits(false);
          }
        });
      } else {
        saveUserEdits(true);
      }
    };

    var saveUserEdits = function(pictureUploadSuccess){
      console.log('updating user', $scope.broker.customData);
      $http.put('/api/users/', $scope.broker)
        .then(function(res){
          $user.get()
          .then(function(user){
            if (pictureUploadSuccess){
              console.log('user profile saved and picture resolved');
              showToast('user profile successfully updated');
              // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
            } else {
              console.log('user profile saved but picture unresolved');
              showToast('user profile successfully updated but problem uploading picture');
            }
            // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
            location.reload();

          })
          .catch(function (error) {
            if (pictureUploadSuccess){
              console.log('user profile saved and picture resolved and could not retrieve user from server');
              showToast('user profile successfully but problem retrieving from server');
            } else {
              console.log('user profile saved but picture unresolved and could not retrieve user from server');
              showToast('user profile successfully updated but problem uploading picture');
            }
            // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
            location.reload();

          });
        })
        .catch(function(err){
          showToast('there was a problem updating the profile');
        });
    };

    $scope.saveUserEdits = function(){
      updatePicture($scope.broker);
    };

    $scope.deleteAccount = function(){
      $http.delete('/api/users').then(function(res){
          // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
        $auth.endSession()
          .then(function(){
            showToast('user profile successfully deleted');
            $state.go('buyreqs.browse.views');
          })
          .catch(function(error){
            showToast('account was deleted but could not log out. please close tab');
            console.log(error);
            $state.go('buyreqs.browse.views');
          });
      }, function(err){
        showToast('there was a problem deleting the account');
        $state.go('buyreqs.browse.views');
      });
    }

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



  });
