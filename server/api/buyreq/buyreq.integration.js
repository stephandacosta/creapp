'use strict';

var app = require('../..');
import request from 'supertest';

var newBuyreq;

describe('Buyreq API:', function() {

  describe('GET /api/buyreqs', function() {
    var buyreqs;

    beforeEach(function(done) {
      request(app)
        .get('/api/buyreqs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          buyreqs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      buyreqs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/buyreqs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/buyreqs')
        .send({
          name: 'New Buyreq',
          info: 'This is the brand new buyreq!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBuyreq = res.body;
          done();
        });
    });

    it('should respond with the newly created buyreq', function() {
      newBuyreq.name.should.equal('New Buyreq');
      newBuyreq.info.should.equal('This is the brand new buyreq!!!');
    });

  });

  describe('GET /api/buyreqs/:id', function() {
    var buyreq;

    beforeEach(function(done) {
      request(app)
        .get('/api/buyreqs/' + newBuyreq._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          buyreq = res.body;
          done();
        });
    });

    afterEach(function() {
      buyreq = {};
    });

    it('should respond with the requested buyreq', function() {
      buyreq.name.should.equal('New Buyreq');
      buyreq.info.should.equal('This is the brand new buyreq!!!');
    });

  });

  describe('PUT /api/buyreqs/:id', function() {
    var updatedBuyreq;

    beforeEach(function(done) {
      request(app)
        .put('/api/buyreqs/' + newBuyreq._id)
        .send({
          name: 'Updated Buyreq',
          info: 'This is the updated buyreq!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBuyreq = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBuyreq = {};
    });

    it('should respond with the updated buyreq', function() {
      updatedBuyreq.name.should.equal('Updated Buyreq');
      updatedBuyreq.info.should.equal('This is the updated buyreq!!!');
    });

  });

  describe('DELETE /api/buyreqs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/buyreqs/' + newBuyreq._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when buyreq does not exist', function(done) {
      request(app)
        .delete('/api/buyreqs/' + newBuyreq._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
