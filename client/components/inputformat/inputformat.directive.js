// directive to use in puts to format numbers
// from http://stackoverflow.com/questions/19890364/format-input-value-in-angularjs?lq=1

'use strict';

angular.module('creapp3App')
  .directive('number', ['$filter',function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) return;
        ctrl.$formatters.unshift(function (a) {
          return $filter('number')(ctrl.$modelValue)
        });
        ctrl.$parsers.unshift(function (viewValue) {
          var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
          elem.val($filter('number')(plainNumber));
          return plainNumber;
        });
      }
    };
  }]);
