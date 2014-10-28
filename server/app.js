var restify = require('restify');
var server = restify.createServer({ name: 'Carryit' });

var userSave = require('save')('user');

server.use(restify.fullResponse()).use(restify.bodyParser());

server.listen(3000, function() {
  console.log(server.name + ' listening at ' + server.url);
});

server.get('/user.json', function(req, res) {
  userSave.find({}, function (err, users) {
    res.send(JSON.stringify({ data: users }));
  });
});

server.post('/user.json', function(req, res) {
  userSave.create(req.params, function(err, user) {
    res.send(201, user);
  });
});
