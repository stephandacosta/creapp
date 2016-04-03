'use strict';

angular.module('creapp3App')
  .controller('ProfileCtrl', function ($scope, $http, $mdToast, $user) {

    $scope.userEdit = _.cloneDeep($scope.user);

    //funciton to show toasts
    var showToast = function(msg){
      console.log('should show toast');
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    };

    $scope.saveUserEdits = function(){
      $http.put('/api/users/', $scope.userEdit).then(function(res){
        $user.get()
        .then(function (user) {
          showToast('user profile successfully updated');
        })
        .catch(function (error) {
          showToast('user profile successfully but problem retrieving from server');
        });
      }, function(err){
        showToast('there was a problem updating the profile');
      });
    };



  });
