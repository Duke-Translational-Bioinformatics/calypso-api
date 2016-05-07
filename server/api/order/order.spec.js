var app = require('../../app');
var request = require('supertest');
var should = require('should');

describe('Order API:', function () {
  describe('GET /api/orders', function () {
    it('should get an order', function (done) {
      request(app)
        .get('/api/order/1')
        .expect(200)
        .end(function (err, res) {
          should.not.exist(err);
          should.exist(res.body);
          done();
        });
    });
  });
});
