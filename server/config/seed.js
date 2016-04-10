module.exports = function (app) {
  var request = require('supertest');
  var should = require('should');
  var pg = require('pg');
  var config = require('./environment');

  var token = 'eace23e0-f54a-42fa-8779-83db92359307'

  // Clear tokens
  var seed = function () {
    pg.connect(config.conString, function (err, client, pgDone) {
      should.not.exist(err);
      client.query('DELETE FROM api_permissions; DELETE FROM users', function (err) {
        should.not.exist(err);
        client.query('INSERT INTO api_permissions VALUES ($1);', [token], function (err) {
          pgDone();
          should.not.exist(err);
          request(app)
            .post('/api/users')
            .send({
              name: 'Test User',
              email: 'test@test.com',
              password: 'test',
              token: token
            })
            .expect(201)
            .end(function (err, res) {
              console.log('Test User Created');
            });
        });
      });
    });
  };
  seed();
}
