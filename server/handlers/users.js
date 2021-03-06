var restify = require('restify');

exports.handle_params = function(req, res, next) {
  var user = req.params;

  verify_user_attributes(user, next);

  req.params = parse_user(user);

  next();
};

function verify_user_attributes(user, next) {
  parse_first_name(user.first_name, next);
  parse_last_name(user.last_name, next);
  parse_username(user.username, next);
  parse_password(user.password, next);
  parse_email(user.email, next);
  parse_birth_date(user.birth_date, next);
  parse_citizen_card(user.citizen_card, next);
  parse_phone_number(user.phone_number, next);
  parse_home_town(user.home_town, next);
}

function parse_first_name(first_name, next) {
  if(first_name === undefined)
    return next(new restify.InvalidArgumentError('First name must be supplied'));

  if(typeof first_name !== 'string' || !(/^[a-zA-Z\u00C0-\u00FF]+$/.test(first_name)))
    return next(new restify.InvalidArgumentError('First name must be a string with only letters'));
}

function parse_last_name(last_name, next) {
  if(last_name === undefined)
    return next(new restify.InvalidArgumentError('Last name must be supplied'));

  if(typeof last_name !== 'string' || !(/^[\u00C0-\u00FFa-zA-Z]+$/.test(last_name)))
    return next(new restify.InvalidArgumentError('Last name must be a string with only letters'));
}

function parse_username(username, next) {
  if(username === undefined)
    return next(new restify.InvalidArgumentError('Username must be supplied'));
  if(typeof username !== 'string')
    return next(new restify.InvalidArgumentError('Username must be a string'));
}

function parse_password(password, next) {
  if(password === undefined)
    return next(new restify.InvalidArgumentError('Password must be supplied'));
  if(typeof password !== 'string' || password.length < 7)
    return next(new restify.InvalidArgumentError('Password must be a string with at least 8 characters'));
}

function parse_email(email, next) {
  if(email === undefined)
    return next(new restify.InvalidArgumentError('Email must be supplied'));

  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if(typeof email !== 'string' || !(regex.test(email)))
    return next(new restify.InvalidArgumentError('Email must be a string and valid'));
}

function parse_birth_date(birth_date, next) {
  if(birth_date === undefined)
    return next(new restify.InvalidArgumentError('Birth date must be supplied'));

  if(typeof birth_date !== 'string' || !(/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/.test(birth_date)))
    return next(new restify.InvalidArgumentError('Birth date must be a string with the format yyyy/mm/dd'));
}

function parse_citizen_card(citizen_card, next) {
  if(citizen_card === undefined)
    return next(new restify.InvalidArgumentError('Citizen card must be supplied'));

  if(typeof citizen_card !== 'string' || !(/^[0-9]+$/.test(citizen_card)))
    return next(new restify.InvalidArgumentError('Citizen card must be a string with only numbers'));
}

function parse_phone_number(phone_number, next) {
  if(phone_number === undefined)
    return next(new restify.InvalidArgumentError('Phone number must be supplied'));

  if(typeof phone_number !== 'string' || !(/^[0-9]{9}$/.test(phone_number)))
    return next(new restify.InvalidArgumentError('Phone number must be a string with only 9 numbers'));
}

function parse_home_town(home_town, next) {
  if(home_town === undefined)
    return next(new restify.InvalidArgumentError('Home town must be supplied'));

  if(typeof home_town !== 'string' || !(/^[\u00C0-\u00FFa-zA-Z]+(\s[\u00C0-\u00FFa-zA-Z]+)*$/.test(home_town)))
    return next(new restify.InvalidArgumentError('Home town must be a string with only letters'));
}

function parse_user(user) {
  var new_user = {};

  new_user.reputation = 0;
  new_user.biography = 'My biography is HARD CORE';

  var user_attributes = [
    'first_name',
    'last_name',
    'username',
    'password',
    'email',
    'birth_date',
    'citizen_card',
    'phone_number',
    'home_town'
  ];

  for(var key in user) {
    if(user_attributes.indexOf(key) !== -1)
      new_user[key] = user[key];
    if(key === 'username')
      new_user._id = user[key];
  }

  return new_user;
}
