var usersController = require('./users.controller');

module.exports = function(app){
  app.post('/api/login', usersController.loginUser);
  app.post('/api/register', usersController.signupUser);
  //app.get('/api/user', usersController.loggedin);
};
