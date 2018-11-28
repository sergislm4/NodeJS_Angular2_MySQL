var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var sql = require('../users/users.model');
var passport = require('passport');


//Exporting the function library
module.exports = function (passport) {
  // =========================================================================
  // passport session setup
  // =========================================================================
  // required for persistent login sessions
  // passport needs hability to serialize and unserialize users out of session

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  // used to deserialize the user
  passport.deserializeUser(function (user, done) {
        done(null, user);
    });
  // Using named strategies since I have one for login and one for signup
  // by default, if there was no name, it would just be called 'local'

  // =========================================================================
  // LOCAL SIGNUP ============================================================
  // =========================================================================
  passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, I will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows to pass back the entire request to the callback
            },
            function (req, email, password, done) {
                sql.countUser(email, function (rows) {
                    if (rows[0].count >= 1) {
                        return done(null, false, 'e-mail is in use in our database');
                    } else {
                        // if there is no user with that email
                        // create the user
                        let newUser = {
                            email: email,
                            password: bcrypt.hashSync(password, null, null),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            user_id: sql.generateJWT(req.body.email)
                        };
                        //Inserts the new user into users table
                        sql.insertUser(newUser, function (rows) {  
                            if (rows) {
                                //Object containing data used in the profile page is send
                                let logged =  {
                                    email: newUser.email,
                                    first_name: newUser.first_name,
                                    token: newUser.user_id,
                                    image:'https://robohash.org/fd'
                                };
                                return done(null, logged);
                            }
                        });
                    }
                });
            }));//Local signup ends

  // =========================================================================
  // LOCAL LOGIN =============================================================
  // =========================================================================
  //Passport strategy to connect locally
  passport.use('local-login', new LocalStrategy({
        // By default, local strategy uses username and password, I will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // Allows to pass back the entire request to the callback
        },
        function (req, user, password, done) {
            //Gets the user from the database
            
            sql.getUser(user, function (error, rows) {
                if (!rows.length) {
                    return done(null, false, 'nouser');
                }//Compare the password with the password encrypted in the database
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    return done(null, false, 'wrongpassword');
                } else {
                    return done(null, rows[0]);
                }
            });
        }));//LocalStrategy ends

};
