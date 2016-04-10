'use strict';

var passport = require('passport'),
  config = require('../../config/environment'),
  jwt = require('jsonwebtoken'),
  pg = require('pg'),
  utility = require('./user.utility'),
  auth = require('../../auth/auth.service');

var validationError = function (res, err) {
  return res.status(422).json(err);
};

var internalError = function (res, err) {
  return res.status(500).json(err);
};

exports.create = function (req, res, next) {
  var name = req.body.name,
    email = req.body.email,
    password = req.body.password,
    token = req.body.token,
    salt = utility.makeSalt(),
    encryptedPassword = utility.encryptPassword(password, salt);
  pg.connect(config.conString, function (err, client, pgDone) {
    if (err) return internalError(res, err);
    client.query(
      'SELECT create_user($1, $2, $3, $4, $5)', [name, email, encryptedPassword, salt, token],
      function (err, result) {
        pgDone();
        if (err) return validationError(res, err);
        var token = auth.signToken(result.rows[0].uuid);
        return res.status(201).json({
          token: token
        });
      });
  });
};
