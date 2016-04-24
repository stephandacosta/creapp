'use strict';

angular.module('creapp3App')
  .controller('mailFormCtrl', function ($scope, $mdDialog, $http, $mdToast, userId, brokerName) {


    var showToast = function(msg){
      $mdToast.show(
        $mdToast.simple()
        .textContent(msg)
        .position('top left')
        .parent(document.getElementById('toasts'))
        .hideDelay(3000)
      );
    };

    $scope.mailForm={};
    $scope.userId = userId;
    $scope.brokerName = brokerName;
    $scope.closeDialog = function() {
     $mdDialog.cancel();
   };

    $scope.sendMail = function() {
      $http.post('/api/mails', {
        from_email: $scope.mailForm.email,
        from_givenName: $scope.mailForm.givenName,
        from_surname: $scope.mailForm.surname,
        message: $scope.mailForm.message,
        user: $scope.userId
      }).then(function(){
        $mdDialog.cancel();
        showToast('Your message was sent');
      }, function(){
        showToast('There was an issue sending your message');
      });
    };

  });
