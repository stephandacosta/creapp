'use strict';
(function(){

function MailboxComponent($scope, $http) {
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

  $http.get('/api/mails').then(response => {
    $scope.messages = response.data;
    console.log($scope.messages);
  });

}

angular.module('creapp3App')
  .component('mailbox', {
    templateUrl: 'app/mailbox/mailbox.html',
    controller: MailboxComponent
  });

})();
