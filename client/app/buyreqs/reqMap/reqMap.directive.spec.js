'use strict';

describe('Directive: reqMap', function () {

  // load the directive's module and view
  beforeEach(module('creapp'));
  beforeEach(module('app/buyreqs/reqMap/reqMap.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-map></req-map>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the reqMap directive');
  }));
});
