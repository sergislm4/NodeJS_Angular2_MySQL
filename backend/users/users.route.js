var usersController = require('./users.controller');

module.exports = function(app){
  app.post('/api/login', usersController.loginUser);
  app.post('/api/register', usersController.signupUser);
  app.post('/api/setAvatar', usersController.setAvatar);
  app.get('/api/user', usersController.loggedin);
  app.put('/api/user', usersController.updateUser);
  //It's justification to exist is that a user endpoint exists as tool for login 
  //While a profile endpoint must include relations with tables outside the user one
  app.get('/api/profile', usersController.getProfileData);
};
