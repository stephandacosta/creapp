'use strict';


angular.module('creapp3App')
  .controller('SidenavController', function($scope, tourService, introService, $mdSidenav, $mdToast, $user){

    $scope.startTour = function(){
      console.log('tour in nave');
      $mdSidenav('left').toggle();
      introService.showIntroPanel();
      // tourService.showCurrentToast();
    };

    $scope.closeSidenav=function(){
      $mdSidenav('left').toggle();
    };

    $user.get()
        .then(function (user) {
          // console.log('The current user is', user);
          var userId = user.href.substr(user.href.lastIndexOf('/') + 1);
          $scope.profileLink = location.host + '/broker/' + userId + '/list';
          var clipboard = new Clipboard('#shareProfile');
          clipboard.on('success', function(e) {
            $mdSidenav('left').toggle();
            $mdToast.show(
              $mdToast.simple()
              .textContent('link has been copied to your clipboard, paste it anywhere')
              .position('top left')
              .parent(document.getElementById('toasts'))
              .hideDelay(3000)
            );
          });
        });
        // .catch(function (error) {
        //   console.log('Error getting user', error);
        // });


  });
