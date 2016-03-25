'use strict';

describe('Directive: addreqForm', function () {

  // load the directive's module and view
  beforeEach(module('creapp3App'));
  beforeEach(module('app/addreq/addreqForm/addreqForm.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<addreq-form></addreq-form>');
    element = $compile(element)(scope);
    scope.$apply();
    element.text().should.equal('this is the addreqForm directive');
  }));
});
