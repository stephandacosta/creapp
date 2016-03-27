'use strict';

describe('Directive: reqList', function () {

  // load the directive's module and view
  beforeEach(module('creapp3App'));
  beforeEach(module('app/buyreqs/reqList/reqList.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<req-list></req-list>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the reqList directive');
  }));
});
