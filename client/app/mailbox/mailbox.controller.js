angular.module('creapp3App')
  .controller('mailboxCtrl', function ($scope, $http, $mdToast, $mdSidenav, $mdMedia) {

    $scope.main = {};
    $scope.main.selected = null;
    $scope.main.openedMailList = true;

    $scope.main.selectMsg = function(msg){
      $scope.main.selected = msg;
      if (!$scope.main.bigScreen){
        $scope.main.openedMailList = false;
      }
    };

    $scope.main.openMailList = function(){
      $scope.main.openedMailList = !$scope.main.openedMailList;
    }

    $scope.$watch(function() { return $mdMedia('gt-xs'); }, function(big) {
      $scope.main.bigScreen = big;
    });

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
        $scope.main.messages = response.data;
        $scope.main.selected = $scope.main.messages[0];
      });
    };

    $scope.main.deleteMsg = function(){
      $http.delete('/api/mails/' + $scope.main.selected._id).then(response => {
        showToast('the message was deleted');
        getMails();
        $scope.main.selected = null;
      });
    };


    getMails();

  });
