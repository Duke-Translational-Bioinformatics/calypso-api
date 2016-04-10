var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  userUtility = require('../../api/user/user.utility'),
  pg = require('pg'),
  config = require('../../config/environment');

exports.setup = function (config) {
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function (email, password, done) {
      pg.connect(config.conString, function (err, client, pgDone) {
        if (err) return done(err);
        client.query('SELECT * FROM users WHERE email = $1', [email], function (err, result) {
          pgDone();
          if (err) return done(err);
          if (!result.rows.length) return done(null, false, {
            message: 'This email is not registered.'
          });

          var user = result.rows[0];
          if (!userUtility.authenticate(password, user.salt, user.hashed_password)) return done(null, false, {
            message: 'This password is not correct.'
          });
          return done(null, user);
        });
      });
    }
  ));
};
