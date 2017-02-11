'use strict';

angular.module('creapp')
  .controller('RegisterCtrl', function ($scope, $mdDialog) {
    $scope.showtcs = function(){
      $mdDialog.show({
        parent: angular.element(document.body),
        // targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: false,
        templateUrl:'app/legal/legal.html',
      });
    };

  });
