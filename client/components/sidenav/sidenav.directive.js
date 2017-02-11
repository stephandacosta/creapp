'use strict';

angular.module('creapp')
  .directive('sidenav', () => ({
    templateUrl: 'components/sidenav/sidenav.html',
    restrict: 'E',
    controller: 'SidenavController'
    // controllerAs: 'nav'
  }));
