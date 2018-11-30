'use strict';

var mysql = require('../config/config.db');
var jwt = require('jsonwebtoken');
var secret = "maythe4th";


var usersModel= {};
module.exports = usersModel;

usersModel.insertUser = function(userData,callback){
    if (mysql.connection) {
        mysql.connection.query('INSERT INTO users SET ?', [userData], function(err, result) {
            if(err){
                throw err;
            }else{
                callback(result);
            }
        });
    }
};

usersModel.countUser = function (email,callback){
    if (mysql.connection) {
        mysql.connection.query('SELECT COUNT(*) AS count FROM users WHERE email LIKE ?', [email],
        function(error, rows) {
            if(error){
                throw error;
            }else{
                callback(rows);
            }
        });
    }
};

usersModel.getUser = function (email, callback){
    if(mysql.connection){
        mysql.connection.query('SELECT * FROM users WHERE email LIKE ?', [email],
        function (error, rows){
            if (error){
              console.log('error');
              throw error;
            }else{
              callback(null,rows);
            }
        });
    }
};

usersModel.getUserLogged = function (token, callback){
    if(mysql.connection){
        mysql.connection.query('SELECT * FROM users WHERE user_id LIKE ?', [token],
        function (error, rows){
            if (error){
              console.log('error');
              throw error;
            }else{
              callback(null,rows);
            }
        });
    }
};

usersModel.getProfileData = function (token, callback){
    if(mysql.connection){
        mysql.connection.query('SELECT * FROM users WHERE user_id LIKE ?', [token],
        function (error, rows){
            if (error){
              console.log('error');
              throw error;
            }else{
              callback(null,rows);
            }
        });
    }
};

usersModel.signupUser = function (data, callback){
  if (mysql.connection) {
        mysql.connection.query('SELECT COUNT(*) FROM users WHERE email LIKE ?', [data.email],
        function(error, rows) {
            if(error){
                throw error;
            }else{
              if(rows[0]['COUNT(*)'] >= 1){
                callback(rows);
              }else{
                if (mysql.connection) {
                    mysql.connection.query('INSERT INTO users SET ?', [data], function(err) {
                        if(err){
                            throw err;
                        }else{
                            callback(rows);
                        }
                    });
                }
              }
                callback(rows);
            }
        });
    }
};

usersModel.updateUser = function (data, callback){
    if(mysql.connection){
        mysql.connection.query('UPDATE users SET ? WHERE email LIKE ?', [data, data.email],
        function (error, rows){
            if (error){
                console.log('error');
                throw error;
            }else{
                callback(rows);
            }
        });
    }
};

usersModel.setAvatar = function (avatar, email, callback){
    if(mysql.connection){
        mysql.connection.query('UPDATE users SET avatar=? WHERE email=?', [avatar, email],
        function (error, rows){
            if (error){
                console.log('error');
                throw error;
            }else{
                callback(rows);
            }
        });
    }
};

usersModel.generateJWT = function(email) {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
  
    return jwt.sign({
      id: Math.floor(Math.random() * 999999999) + 1,
      username: email,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
};