var restify  = require('restify');
var server   = restify.createServer({ name: 'Carryit' });

var userSave = require('save')('user');

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

server.post('/users.json', handle_user, function(req, res) {
  userSave.create(req.params, function(err, user) {
    res.send(201, user);
  });
});

function handle_user(req, res, next) {
  var user = req.params;

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

  req.params = new_user;
  next();
}
