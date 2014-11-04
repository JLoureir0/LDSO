var restify    = require('restify');
var server     = restify.createServer({ name: 'Carryit' });

var user_save  = require('save')('user');

var logger     = require('restify-logger');

var users_hdlr = require('./handlers/users.js');
var user_hdlr  = require('./handlers/user.js');

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(logger('dev'));
server.use(function(req, res, next) {
  res.charSet('utf-8');
  next();
});

server.use(restify.queryParser());

server.listen(3000, function() {
  console.log(server.name + ' listening at ' + server.url);
});

server.get('/users.json', function(req, res) {
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
