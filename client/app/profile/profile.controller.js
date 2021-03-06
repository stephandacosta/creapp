'use strict';

angular.module('creapp')
  .controller('ProfileCtrl', function ($scope, $state, $http, $mdToast, $user, $auth, pictureuploadService) {

    $scope.updating =  false;
    var startProgress = function(){
      $scope.updating = true;
      console.log('$scope.updating',$scope.updating);
    };
    var stopProgress = function(){
      $scope.updating = false;
      console.log('$scope.updating',$scope.updating);
    };

    $scope.broker = $user.currentUser;
    var userId;

    var getUserId = function(){
      return $scope.broker.href.substr($scope.broker.href.lastIndexOf('/') + 1);
    };


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

    var updateUserEdits = function(){
      return $http.put('/api/users/', $scope.broker)
      .then(function(){
        return $user.get(true);
      })
      .then(function(user){
        console.log('user profile saved and picture resolved', user);
        showToast('user profile successfully updated');
        stopProgress();
        // hack: refresh document to get user refreshed (the current sdk methods always get from cache)
        // location.reload();
        pictureuploadService.updateTimestamp();
        $scope.edit.mode = false;
      });
    };

    $scope.saveUserProfile = function(){
      startProgress();
      if ($scope.edit.hasPicStaged){
        // case when a picture is staged and need to be updated on server
        pictureuploadService.getSignature()
        .then(pictureuploadService.uploadImageToStorage)
        .then(function(success){
          console.log('picture resolved', success);
          $scope.broker.customData.hasPicture = true;
          console.log('updating user', $scope.broker.customData);
          return true;
        })
        .then(updateUserEdits)
        .catch(function(error){
          console.log('profile update problem', error);
          stopProgress();
        });
      } else if ($scope.edit.deletePicture) {
        // case when a picture needs to be deleted on server
        pictureuploadService.getSignature()
        .then(pictureuploadService.deleteImageFromStorage)
        .then(function(success){
          console.log('picture resolved', success);
          $scope.broker.customData.hasPicture = false;
          console.log('updating user', $scope.broker.customData);
          return true;
        })
        .then(updateUserEdits)
        .catch(function(error){
          console.log('profile update problem', error);
          stopProgress();
        });
      } else {
        // no change in customData.hasPicture property
        updateUserEdits()
        .catch(function(error){
          console.log('profile update problem', error);
          stopProgress();
        });
      }
    };

    $scope.deleteAccount = function(){
      $http.delete('/api/users').then(function(){
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
        console.log(err);
        showToast('there was a problem deleting the account');
        $state.go('buyreqs.browse.views');
      });
    };

  });
