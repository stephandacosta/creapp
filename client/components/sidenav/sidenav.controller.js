'use strict';


angular.module('creapp3App')
  .controller('SidenavController', function($scope, tourService, introService, $mdSidenav){

    $scope.startTour = function(){
      console.log('tour in nave');
      introService.showIntroPanel();
      // tourService.showCurrentToast();
    };
    $scope.closeSidenav=function(){
      $mdSidenav('left').toggle();
    };

  });
