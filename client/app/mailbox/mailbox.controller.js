'use strict';
(function(){

function MailboxComponent($scope, $http) {
  $http.get('/api/mails').then(response => {
    $scope.messages = response.data;
  });
}

angular.module('creapp3App')
  .component('mailbox', {
    templateUrl: 'app/mailbox/mailbox.html',
    controller: MailboxComponent
  });

})();
