'use strict';

angular.module('creapp3App')
  .directive('addreqForm', function () {
    return {
      templateUrl: 'app/addreq/addreqForm/addreqForm.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
