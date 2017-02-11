'use strict';

angular.module('creapp')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController'
    // controllerAs: 'nav'
  }));
