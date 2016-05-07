var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Target API:', function () {
  describe('GET /api/targets/patient/:id', function () {
    it('should get targets for the patient', function (done) {
      request(app)
        .get('/api/targets/patient/:id')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
  describe('GET /api/targets/:id', function () {
    it('should get target', function (done) {
      request(app)
        .get('/api/targets:id')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
});
