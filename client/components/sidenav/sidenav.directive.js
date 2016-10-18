'use strict';

angular.module('creapp3App')
  .directive('sidenav', () => ({
    templateUrl: 'components/sidenav/sidenav.html',
    restrict: 'E',
    controller: 'SidenavController'
    // controllerAs: 'nav'
  }));
