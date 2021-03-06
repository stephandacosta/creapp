'use strict';

angular.module('creapp')
  .controller('SidenavController', function($scope, $state, tourService, introService, $mdSidenav, $mdToast, $user){


    $scope.closeSidenav=function(){
      $mdSidenav('left').toggle();
    };

    $scope.startTour = function(){
      $scope.closeSidenav();
      $state.go('buyreqs.browse.views');
      introService.showIntroPanel();
    };

    $user.get()
        .then(function (user) {
          // console.log('The current user is', user);
          var userId = user.href.substr(user.href.lastIndexOf('/') + 1);
          $scope.profileLink = location.host + '/browse?broker=' + userId;
          var clipboard = new window.Clipboard('#shareProfile');
          clipboard.on('success', function() {
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
