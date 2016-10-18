'use strict';


angular.module('creapp3App')
  .controller('NavbarController', function($scope, tourService, introService, $mdSidenav){
    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    $scope.startTour = function(){
      console.log('tour in nave');
      introService.showIntroPanel();
      // tourService.showCurrentToast();
    };
    $scope.openSidenav=function(){
      $mdSidenav('left').toggle();
    };
  });
