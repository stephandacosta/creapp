'use strict';


angular.module('creapp3App')
  .controller('NavbarController', function($scope, tourService, introService, $mdSidenav){
    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    $scope.openSidenav=function(){
      $mdSidenav('left').toggle();
    };
  });
