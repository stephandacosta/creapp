'use strict';

describe('Service: buyreqs', function () {

  // load the service's module
  beforeEach(module('creapp'));

  // instantiate service
  var buyreqs;
  beforeEach(inject(function (_buyreqs_) {
    buyreqs = _buyreqs_;
  }));

  it('should do something', function () {
    !!buyreqs.should.be.true;
  });

});
