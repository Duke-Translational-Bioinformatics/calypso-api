'use strict';

var crypto = require('crypto');

exports.makeSalt = function () {
  return crypto.randomBytes(16).toString('base64');
};

exports.encryptPassword = function (password, salt) {
  if (!password || !salt) return '';
  salt = new Buffer(salt, 'base64');
  return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
}

exports.authenticate = function (plainText, salt, hashedPassword) {
  return exports.encryptPassword(plainText, salt) === hashedPassword;
};
