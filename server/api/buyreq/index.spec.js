'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var buyreqCtrlStub = {
  index: 'buyreqCtrl.index',
  show: 'buyreqCtrl.show',
  create: 'buyreqCtrl.create',
  update: 'buyreqCtrl.update',
  destroy: 'buyreqCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var buyreqIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './buyreq.controller': buyreqCtrlStub
});

describe('Buyreq API Router:', function() {

  it('should return an express router instance', function() {
    buyreqIndex.should.equal(routerStub);
  });

  describe('GET /api/buyreqs', function() {

    it('should route to buyreq.controller.index', function() {
      routerStub.get
        .withArgs('/', 'buyreqCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/buyreqs/:id', function() {

    it('should route to buyreq.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'buyreqCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/buyreqs', function() {

    it('should route to buyreq.controller.create', function() {
      routerStub.post
        .withArgs('/', 'buyreqCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/buyreqs/:id', function() {

    it('should route to buyreq.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'buyreqCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/buyreqs/:id', function() {

    it('should route to buyreq.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'buyreqCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/buyreqs/:id', function() {

    it('should route to buyreq.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'buyreqCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
