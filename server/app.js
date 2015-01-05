var restify       = require('restify');
var server        = restify.createServer({ name: 'Carryit' });

var user_save     = require('save')('user');
var trip_save     = require('save')('trip');
var message_save  = require('save')('message');

var passport      = require('passport');
var passport_http = require('passport-http');

var logger        = require('restify-logger');

var users_hdlr    = require('./handlers/users.js');
var user_hdlr     = require('./handlers/user.js');

var trips_hdlr    = require('./handlers/trips.js');

var messages_hdlr = require('./handlers/messages.js');

restify.CORS.ALLOW_HEADERS.push('authorization');

server.use(restify.fullResponse());
server.use(restify.bodyParser());

server.use(logger('dev'));

server.use(function(req, res, next) {
  res.charSet('utf-8');
  next();
});

server.use(restify.queryParser());

server.use(passport.initialize());

passport.use(new passport_http.BasicStrategy(function(username, password, done) {
  user_save.findOne({ username: username }, function(err, user) {
    if(!user)
      return done(new restify.InvalidCredentialsError('Wrong username or password'));
    if(err)
      return done(new restify.InvalidArgumentError(JSON.stringify(err.errors)));

    if(password === user.password)
      done(null, { id: username });
    else
      done(null, false);
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, { id: id });
});

function authentication(req, res, next) {
  if (!req.isAuthenticated())
    res.send(401);
  else
    next();
}

server.listen(3000, function() {
  console.log(server.name + ' listening at ' + server.url);
});

server.get('/login', passport.authenticate('basic', { session: false }), function(req, res) {
  if (req.isAuthenticated())
    res.send(200);
  else
    res.send(401);

});

server.get(/^\/users\/(.+)\/messages.json$/, passport.authenticate('basic', { session: false }), authentication, function(req, res) {
  if(req.user === undefined || req.params[0] !== req.user.id)
    res.send(401);
  else {
    message_save.find({ receiver: req.user.id }, function (err, messages) {
      res.send({ data: messages });
    });
  }
});

server.post(/^\/users\/(.+)\/messages.json$/, passport.authenticate('basic', { session: false }), authentication, messages_hdlr.handle_params, function(req, res) {
  message_save.create(req.params, function(err, message) {
    res.send(201, message);
  });
});

server.get('/users.json', passport.authenticate('basic', { session: false }), authentication, function(req, res) {
  user_save.find({}, function (err, users) {
    res.send({ data: users });
  });
});

server.post('/users.json', users_hdlr.handle_params, function(req, res) {
  user_save.create(req.params, function(err, user) {
    res.send(201, user);
  });
});

server.get(/^\/users\/(.+)\.json$/, function(req, res, next) {
  user_save.findOne({ _id: req.params[0] }, function(err, user) {
    if(err)
      return next(new restify.InvalidArgumentError(JSON.stringify(err.errors)));

    if(user)
      res.send({ data: user});
    else
      res.send(404);
  });
});

server.put(/^\/users\/(.+)\.json$/, passport.authenticate('basic', { session: false }), authentication, user_hdlr.handle_params, function(req, res, next) {
  user_save.update(req.params, function (err, user) {
    if(err)
      res.send(404);
    else if(req.user === undefined || req.params._id !== req.user.id)
      res.send(401);
    res.send(user);
  });
});

server.del(/^\/users\/(.+)\.json$/, function(req, res) {
  user_save.delete(req.params[0], function(err, user) {
    if(err)
      res.send(404);
    res.send(200);
  });
});

server.get('/trips.json', function(req, res) {
  trip_save.find({}, function (err, trips) {
    res.send({ data: trips });
  });
});

server.post('/trips.json', passport.authenticate('basic', { session: false }), authentication, trips_hdlr.handle_params, function(req, res) {
  user_save.findOne({ _id: req.params.username }, function(err, user) {
    req.params.phone_number = user.phone_number;
    trip_save.create(req.params, function(err, trip) {
      res.send(201, trip);
    });
  });
});

server.del(/^\/trips\/(.+)\.json$/, passport.authenticate('basic', { session: false }), authentication, function(req, res) {
  trip_save.findOne({ _id: req.params[0] }, function(err, trip) {
    if(trip === undefined)
      res.send(404);
    if(req.user === undefined || trip.username !== req.user.id)
      res.send(401);
    else {
      trip_save.delete(req.params[0], function(err, trip) {
        if(err)
          res.send(404);
        res.send(200);
      });
    }
  });
});
