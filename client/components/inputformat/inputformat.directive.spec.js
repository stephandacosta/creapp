'use strict';

describe('Directive: inputformat', function () {

  // load the directive's module
  beforeEach(module('creapp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<inputformat></inputformat>');
    element = $compile(element)(scope);
    element.text().should.equal('this is the inputformat directive');
  }));
});
