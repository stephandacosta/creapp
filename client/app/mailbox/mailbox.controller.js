'use strict';
(function(){

function MailboxComponent($scope, $http, $mdToast) {
  $scope.selected = null;

  $scope.toggleMsg = function(msg){
    if (!$scope.selected){
      $scope.selected = msg;
    } else {
      if ($scope.selected._id === msg._id){
        $scope.selected = null;
      }
    }
  };

  var showToast = function(msg){
    $mdToast.show(
      $mdToast.simple()
      .textContent(msg)
      .position('top left')
      .parent(document.getElementById('toasts'))
      .hideDelay(3000)
    );
  };

  var getMails = function(){
    $http.get('/api/mails').then(response => {
      $scope.messages = response.data;
    });
  };

  $scope.deleteMsg = function(msg){
    $http.delete('/api/mails/' + msg._id).then(response => {
      showToast('the message was deleted');
      getMails();
      $scope.selected = null;
    });
  };


  getMails();

}

angular.module('creapp3App')
  .component('mailbox', {
    templateUrl: 'app/mailbox/mailbox.html',
    controller: MailboxComponent
  });

})();
