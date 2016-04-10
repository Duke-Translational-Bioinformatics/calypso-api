// var app = require('../../app');
// var request = require('supertest');
// var should = require('should');
// var pg = require('pg');
// var config = require('../../config/environment');

// describe('User API:', function () {

//   var token = 'eace23e0-f54a-42fa-8779-83db92359307'

//   // Clear tokens
//   before(function (done) {
//     pg.connect(config.conString, function (err, client, pgDone) {
//       should.not.exist(err);
//       client.query('DELETE FROM api_permissions; DELETE FROM users', function (err) {
//         should.not.exist(err);
//         client.query('INSERT INTO api_permissions VALUES ($1);', [token], function (err) {
//           pgDone();
//           should.not.exist(err);
//           done();
//         });
//       });
//     });
//   });

//   // Clear users after testing
//   after(function (done) {
//     pg.connect(config.conString, function (err, client, pgDone) {
//       should.not.exist(err);
//       client.query('DELETE FROM api_permissions; DELETE FROM users;', function (err) {
//         should.not.exist(err);
//         pgDone();
//         done();
//       });
//     });
//   });

//   describe('POST /api/users', function () {
//     it('should save a user', function (done) {
//       request(app)
//         .post('/api/users')
//         .send({
//           name: 'Test User',
//           email: 'test@test.com',
//           password: 'test',
//           token: token
//         })
//         .expect(201)
//         .end(function (err, res) {
//           should.not.exist(err);
//           should.exist(res.body.token);
//           done();
//         });
//     });
//   });

//   describe('POST /auth/local', function () {
//     it('should login a user', function (done) {
//       request(app)
//         .post('/auth/local')
//         .send({
//           email: 'test@test.com',
//           password: 'test'
//         })
//         .expect(200)
//         .end(function (err, res) {
//           should.not.exist(err);
//           should.exist(res.body.token);
//           done();
//         });
//     });
//   });
// });
