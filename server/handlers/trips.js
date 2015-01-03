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
  parse_week_day(trip.week_day, next);
  parse_month_day(trip.month_day, next);
  parse_month(trip.month, next);
  parse_year(trip.year, next);
  parse_start_time(trip.start_time, next);
  parse_schedule_end_time(trip.schedule_end_time, next);
}

function parse_starting_point(starting_point, next) {
  if(starting_point === undefined)
    return next(new restify.InvalidArgumentError('Starting point must be supplied'));

  if(typeof starting_point !== 'string' || !(/^[\u00C0-\u00FFa-zA-Z]+(\s[\u00C0-\u00FFa-zA-Z]+)*$/.test(starting_point)))
    return next(new restify.InvalidArgumentError('Starting point must be a string with only letters'));
}

function parse_destination(destination, next) {
  if(destination === undefined)
    return next(new restify.InvalidArgumentError('Destination must be supplied'));

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

function parse_week_day(week_day, next) {
  if(week_day === undefined)
    return next(new restify.InvalidArgumentError('Week day must be supplied'));

  if(typeof week_day !== 'string' || !(/^(Seg|Ter|Qua|Qui|Sex|Sab|Dom)$/.test(week_day)))
    return next(new restify.InvalidArgumentError('Week day must be Seg, Ter, Qua, Qui, Sex, Sab or Dom'));
}

function parse_month_day(month_day, next) {
  if(month_day === undefined)
    return next(new restify.InvalidArgumentError('Month day must be supplied'));

  if(typeof month_day !== 'string' || !(/^([1-9]|[1-2][0-9]|30|31)$/.test(month_day)))
    return next(new restify.InvalidArgumentError('Month day must be a number between 1 and 31'));
}

function parse_month(month, next) {
  if(month === undefined)
    return next(new restify.InvalidArgumentError('Month must be supplied'));

  if(typeof month !== 'string' || !(/^(Jan|Feb|Mar|Abr|Mai|Jun|Jul|Ago|Set|Out|Nov|Dez)$/.test(month)))
    return next(new restify.InvalidArgumentError('Month must be Jan, Feb, Mar, Abr, Mai, Jun, Jul, Ago, Set, Out, Nov or Dez'));
}

function parse_year(year, next) {
  if(year === undefined)
    return next(new restify.InvalidArgumentError('Year must be supplied'));

  if(typeof year !== 'string' || !(/^20(1[5-9]|[2-9][0-9])$/.test(year)))
    return next(new restify.InvalidArgumentError('Year must valid'));
}

function parse_start_time(start_time, next) {
  if(start_time === undefined)
    return next(new restify.InvalidArgumentError('Start time must be supplied'));

  if(typeof start_time !== 'object' || start_time.hour === undefined || start_time.minute === undefined || !(/^(0[1-9]|1[0-9]|2[0-3])$/.test(start_time.hour)) || !(/^[0-5][0-9]$/.test(start_time.minute)))
    return next(new restify.InvalidArgumentError('Start time must be an object with a time, an hour and a minute members'));
}

function parse_schedule_end_time(schedule_end_time, next) {
  if(schedule_end_time === undefined)
    return next(new restify.InvalidArgumentError('Schedule end time must be supplied'));

  if(typeof schedule_end_time !== 'object' || schedule_end_time.hour === undefined || schedule_end_time.minute === undefined || !(/^(0[1-9]|1[0-9]|2[0-3])$/.test(schedule_end_time.hour)) || !(/^[0-5][0-9]$/.test(schedule_end_time.minute)))
    return next(new restify.InvalidArgumentError('Schedule end time must be an object with a time, an hour and a minute members'));
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
    'week_day',
    'month_day',
    'month',
    'year',
    'start_time',
    'schedule_end_time'
  ];

  for(var key in trip) {
    if(trip_attributes.indexOf(key) !== -1) {
      if(key === 'start_time' || key === 'schedule_end_time')
        new_trip[key] = parse_time(trip[key]);
      else
        new_trip[key] = trip[key];
    }
  }

  return new_trip;
}

function parse_time(time) {
  var new_time = {};

  var time_attributes = [
    'hour',
    'minute',
  ];

  for(var key in time) {
    if(time_attributes.indexOf(key) !== -1)
      new_time[key] = time[key];
  }

  return new_time;
}
