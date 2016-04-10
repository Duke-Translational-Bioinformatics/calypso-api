'use strict';

var config = require('../config/environment'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt'),
  compose = require('composable-middleware'),
  pg = require('pg'),
  fs = require('fs'),
  publicKey = fs.readFileSync(config.publicKeyPath),
  privateKey = fs.readFileSync(config.privateKeyPath),
  validateJwt = expressJwt({
    secret: publicKey
  });

/**
 * Middleware for attaching user and permissions to the request object.
 */
function isAuthenticated() {
  return compose()
    .use(function (req, res, next) {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    }).use(function (req, res, next) {
      pg.connect(config.conString, function (err, client, done) {
        client.query('SELECT get_user($1)', [req.user.uuid],
          function (err, result) {
            done();
            if (err) return next(err);
            if (!result.rows.length) return res.status(403).end();
            var queryResult = result.rows[0].get_user,
              user = queryResult.f1,
              permissions = queryResult.f2;
            req.user = user;
            req.user_permissions = permissions;
            return next();
          });
      });
    });
}

/**
 * Returns a jwt token signed by the private key.
 */
function signToken(uuid) {
  return jwt.sign({
    uuid: uuid
  }, privateKey, {
    algorithm: 'RS256'
  });
}

exports.isAuthenticated = isAuthenticated;
exports.signToken = signToken;
