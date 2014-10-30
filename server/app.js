var restify  = require('restify');
var server   = restify.createServer({ name: 'Carryit' });

var userSave = require('save')('user');

var users = require('./handlers/users.js');

server.use(restify.fullResponse());
server.use(restify.bodyParser());
server.use(function(req, res, next) {
  res.charSet('utf-8');
  next();
});

server.listen(3000, function() {
  console.log(server.name + ' listening at ' + server.url);
});

server.get('/users.json', function(req, res) {
  userSave.find({}, function (err, users) {
    res.send({ data: users });
  });
});

server.post('/users.json', users.handle_user, function(req, res) {
  userSave.create(req.params, function(err, user) {
    res.send(201, user);
  });
});
