var restify = require('restify');

exports.version = '0.1.0';

exports.handle_user = function(req, res, next) {
  var user = req.params;

  verify_user_attributes(user, next);

  req.params = parse_user(user);

  next();
};

function verify_user_attributes(user, next) {
  if(user.first_name === undefined)
    return next(new restify.InvalidArgumentError('First name must be supplied'));
  if(user.last_name === undefined)
    return next(new restify.InvalidArgumentError('Last name must be supplied'));
  if(user.username === undefined)
    return next(new restify.InvalidArgumentError('Username must be supplied'));
  if(user.password === undefined)
    return next(new restify.InvalidArgumentError('Password must be supplied'));
  if(user.email === undefined)
    return next(new restify.InvalidArgumentError('Email must be supplied'));
  if(user.birth_date === undefined)
    return next(new restify.InvalidArgumentError('Birth date must be supplied'));
  if(user.citizen_card === undefined)
    return next(new restify.InvalidArgumentError('Citizen card must be supplied'));
  if(user.phone_number === undefined)
    return next(new restify.InvalidArgumentError('Phone number must be supplied'));
}

function parse_user(user) {
  var new_user = {};

  new_user.reputation = 0;

  var user_attributes = [
    'first_name',
    'last_name',
    'username',
    'password',
    'email',
    'birth_date',
    'citizen_card',
    'phone_number'
  ];

  for(var key in user)
    if(user_attributes.indexOf(key) !== -1)
      new_user[key] = user[key];

  return new_user;
}
