var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Patient API:', function () {
  describe('GET /api/patients', function () {
    it('should get a patient', function (done) {
      request(app)
        .get('/api/patients/1')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
});
