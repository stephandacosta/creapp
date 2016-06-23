'use strict';

angular.module('creapp3App')
  .directive('navbar', () => ({
    templateUrl: 'components/navbar/navbar.html',
    restrict: 'E',
    controller: 'NavbarController'
    // controllerAs: 'nav'
  }));
