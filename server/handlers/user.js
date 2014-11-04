var restify = require('restify');

exports.handle_params = function(req, res, next) {
  req.params._id = req.params[0];
  delete req.params[0];

  var user = req.params;

  parse_password(user.password, next);
  parse_email(user.email, next);
  parse_phone_number(user.phone_number, next);

  req.params = parse_user(user);
  next();
};

function parse_password(password, next) {
  if(password !== undefined)
    if(typeof password !== 'string' || password.length < 7)
      return next(new restify.InvalidArgumentError('Password must be a string with at least 8 characters'));
}

function parse_email(email, next) {
  if(email !== undefined) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(typeof email !== 'string' || !(regex.test(email)))
      return next(new restify.InvalidArgumentError('Email must be a string and valid'));
  }
}

function parse_phone_number(phone_number, next) {
  if(phone_number !== undefined)
    if(typeof phone_number !== 'string' || !(/^[0-9]{9}$/.test(phone_number)))
      return next(new restify.InvalidArgumentError('Phone number must be a string with only 9 numbers'));
}

function parse_user(user) {
  var new_user = {};

  var user_attributes = [
    '_id',
    'password',
    'email',
    'phone_number'
  ];

  for(var key in user)
    if(user_attributes.indexOf(key) !== -1)
      new_user[key] = user[key];

  return new_user;
}
