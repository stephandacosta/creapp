'use strict';

describe('Directive: reqForm', function () {

  // load the directive's module and view
  beforeEach(module('creapp'));
  beforeEach(module('app/req/reqForm/reqForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-form></req-form>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the reqForm directive');
  }));
});
