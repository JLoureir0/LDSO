var restify = require('restify');

exports.handle_params = function(req, res, next) {
  var trip     = req.params;
  var username = req.user.id;

  verify_trip_attributes(trip, next);

  req.params = parse_trip(trip);

  req.params.username = username;

  next();
};

function verify_trip_attributes(trip, next) {
  parse_starting_point(trip.starting_point, next);
  parse_destination(trip.destination, next);
  parse_fragile(trip.fragile, next);
  parse_flamable(trip.flamable, next);
  parse_big_dimensions(trip.big_dimensions, next);
  parse_vehicle(trip.vehicle, next);
  parse_min_price(trip.min_price, next);
  parse_max_deviation(trip.max_deviation, next);
}

function parse_starting_point(starting_point, next) {
  if(starting_point === undefined)
    return next(new restify.InvalidArgumentError('Starting point must be supplied'));

  if(typeof starting_point !== 'string' || !(/^[\u00C0-\u00FFa-zA-Z]+(\s[\u00C0-\u00FFa-zA-Z]+)*$/.test(starting_point)))
    return next(new restify.InvalidArgumentError('Starting point must be a string with only letters'));
}

function parse_destination(destination, next) {
  if(destination === undefined)
    return next(new restify.InvalidArgumentError('Last name must be supplied'));

  if(typeof destination !== 'string' || !(/^[\u00C0-\u00FFa-zA-Z]+(\s[\u00C0-\u00FFa-zA-Z]+)*$/.test(destination)))
    return next(new restify.InvalidArgumentError('Destination must be a string with only letters'));
}

function parse_fragile(fragile, next) {
  if(fragile === undefined)
    return next(new restify.InvalidArgumentError('Fragile must be supplied'));

  if(typeof fragile !== 'string' || !(/^(true|false)$/.test(fragile)))
    return next(new restify.InvalidArgumentError('Fragile must be true or false'));
}

function parse_flamable(flamable, next) {
  if(flamable === undefined)
    return next(new restify.InvalidArgumentError('Flamable must be supplied'));

  if(typeof flamable !== 'string' || !(/^(true|false)$/.test(flamable)))
    return next(new restify.InvalidArgumentError('Flamable must be true or false'));
}

function parse_big_dimensions(big_dimensions, next) {
  if(big_dimensions === undefined)
    return next(new restify.InvalidArgumentError('Big dimensions must be supplied'));

  if(typeof big_dimensions !== 'string' || !(/^(true|false)$/.test(big_dimensions)))
    return next(new restify.InvalidArgumentError('Big dimensions must be true or false'));
}

function parse_vehicle(vehicle, next) {
  if(vehicle === undefined)
    return next(new restify.InvalidArgumentError('Vehicle must be supplied'));

  if(typeof vehicle !== 'string' || !(/^[0-1]$/.test(vehicle)))
    return next(new restify.InvalidArgumentError('Vehicle must be 0 or 1'));
}

function parse_min_price(min_price, next) {
  if(min_price === undefined)
    return next(new restify.InvalidArgumentError('Minimum price must be supplied'));

  if(typeof min_price !== 'string' || !(/^[1-9][0-9]*$/.test(min_price)))
    return next(new restify.InvalidArgumentError('Minimum price must be a number greater than zero'));
}

function parse_max_deviation(max_deviation, next) {
  if(max_deviation === undefined)
    return next(new restify.InvalidArgumentError('Maximum deviation must be supplied'));

  if(typeof max_deviation !== 'string' || !(/^[1-9][0-9]*$/.test(max_deviation)))
    return next(new restify.InvalidArgumentError('Maximum deviation must be a number greater than zero'));
}

function parse_trip(trip) {
  var new_trip = {};

  var trip_attributes = [
    'starting_point',
    'destination',
    'fragile',
    'flamable',
    'big_dimensions',
    'vehicle',
    'min_price',
    'max_deviation',
  ];

  for(var key in trip) {
    if(trip_attributes.indexOf(key) !== -1)
      new_trip[key] = trip[key];
  }

  return new_trip;
}
