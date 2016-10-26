'use strict';

angular.module('creapp3App')
  .controller('ProfileCtrl', function ($scope, $rootScope, $http, $mdToast, $user, $timeout, pictureuploadService) {

    $scope.broker = $user.currentUser;
    var userId;

    var getUserId = function(){
      return $scope.broker.href.substr($scope.broker.href.lastIndexOf('/') + 1);
    };

    var resetEdits = function(){
      $scope.edit = {
        mode: false,
        broker : _.cloneDeep($user.currentUser),
        hasPicStaged : true,
        hasPicCommitted : true
      };
      userId = getUserId();
    };

    resetEdits();


    // var getBrokerPictureLink = function(){
    //   $scope.brokerpic = pictureuploadService.getBrokerPicLink(getUserId());
    // };

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

    $scope.saveUserEdits = function(){
      if ($scope.edit.hasPicStaged){
        pictureuploadService.uploadImageToStorage();
      }
      $http.put('/api/users/', $scope.broker).then(function(res){
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
