'use strict';

angular.module('creapp3App')
  .controller('mailFormCtrl', function ($scope, $mdDialog, userId, brokerName) {

    $scope.mailForm={};
    $scope.userId = userId;
    $scope.brokerName = brokerName;
    $scope.closeDialog = function() {
     $mdDialog.cancel();
    }

  });
