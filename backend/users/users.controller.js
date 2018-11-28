var passport = require('passport');
var sql = require('../users/users.model');

module.exports.signupUser = signupUser;
module.exports.loginUser = loginUser;
module.exports.loggedin = loggedin;


function signupUser(req, res, next){
  passport.authenticate('local-signup', function (err, user, info){
      if (err) {
          return res.send(err);
      }else if (!user) {
          return res.send('Mail already exists');
      }
      return res.send({user: user});
  })(req, res, next);
}

function loginUser (req, res, next){
  passport.authenticate('local-login', function (err, user, info){
      if(err){
          return res.send(err);
      }
      if (!user) {
          return res.send('error credentials');
      }
      req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.send(user);
      });
  })(req, res, next);
}

function loggedin(req, res){
    sql.getUserLogged(req.body.token, function (err, rows) {
        if (!rows.length) {
            res.send(err);
        }else {
            console.log(rows[0]);
            res.send(rows[0]);
        }
    });
}