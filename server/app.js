var restify       = require('restify');
var server        = restify.createServer({ name: 'Carryit' });

var user_save     = require('save')('user');

var passport      = require('passport');
var passport_http = require('passport-http');

var logger        = require('restify-logger');

var users_hdlr    = require('./handlers/users.js');
var user_hdlr     = require('./handlers/user.js');

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
      return done(new restify.InvalidArgumentError('No user'));
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

server.put(/^\/users\/(.+)\.json$/, user_hdlr.handle_params, function(req, res, next) {
  user_save.update(req.params, function (err, user) {
    if(err)
      res.send(404);
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
