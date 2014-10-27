var restify = require('restify');
var server = restify.createServer({ name: 'Carryit' });

server.use(restify.fullResponse()).use(restify.bodyParser());

server.listen(3000, function() {
  console.log(server.name + ' listening at ' + server.url);
});

server.get('/user.json', function(req, res) {
  res.send(200);
});
