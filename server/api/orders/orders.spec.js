var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Order API:', function () {
  describe('GET /api/orders', function () {
    it('should get an order', function (done) {
      request(app)
        .get('/api/orders/10')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
    it('should get an order', function (done) {
      request(app)
        .get('/api/orders/20')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
    it('should get a list', function (done) {
      var id_array = encodeURIComponent(JSON.stringify([10, 20]));
      request(app)
        .get('/api/orders?id_array=10&id_array=20')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
});
