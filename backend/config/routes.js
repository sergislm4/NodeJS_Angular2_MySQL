'use strict';

module.exports.init = init;

function init(app, passport) {
  require('../users/users.route.js')(app, passport);
}
