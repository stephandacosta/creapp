// directive to use in puts to format numbers
// from http://stackoverflow.com/questions/19890364/format-input-value-in-angularjs?lq=1

'use strict';

angular.module('creapp')
  .directive('number', ['$filter',function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) {return;}
        ctrl.$formatters.unshift(function () {
          return $filter('number')(ctrl.$modelValue);
        });
        ctrl.$parsers.unshift(function (viewValue) {
          var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
          elem.val($filter('number')(plainNumber));
          return plainNumber;
        });
      }
    };
  }])
  .directive('dollars', ['$filter',function ($filter) {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) {return;}
        ctrl.$formatters.unshift(function () {
          return $filter('currency')(ctrl.$modelValue, '$', 0);
        });
        ctrl.$parsers.unshift(function (viewValue) {
          var plainNumber = viewValue.replace(/[^\d]/g, '');
          elem.val($filter('currency')(plainNumber, '$', 0));
          return plainNumber;
        });
      }
    };
  }])
  .directive('dollarspersqft', ['$filter',function () {
    return {
      require: '?ngModel',
      link: function (scope, elem, attrs, ctrl) {
        if (!ctrl) {return;}
        ctrl.$formatters.unshift(function () {
          return '$/sqft ' + (ctrl.$modelValue===undefined ? '' : ctrl.$modelValue);
        });
        ctrl.$parsers.unshift(function (viewValue) {
          var plainNumber = viewValue.replace(/[^\d|\-+|\.+]/g, '');
          elem.val('$/sqft ' + (plainNumber===undefined ? '' : plainNumber));
          plainNumber = plainNumber.replace(/\.$/g, '');
          return plainNumber;
        });
      }
    };
  }]);
