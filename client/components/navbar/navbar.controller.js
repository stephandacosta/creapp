'use strict';


angular.module('creapp3App')
  .controller('NavbarController', function($scope, tourService, introService){
    $scope.openMenu = function($mdOpenMenu, ev) {
      $mdOpenMenu(ev);
    };
    $scope.startTour = function(){
      console.log('tour in nave');
      introService.resetAlreadySeen();
      introService.showIntroPanel();
      // tourService.showCurrentToast();
    };
  });
