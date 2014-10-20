var restify = require('restify'), userSave = require('save')('user'), server = restify.createServer({ name: 'my-api' })

server.listen(3000, function () {
	console.log('%s listening at %s', server.name, server.url)
})

server.use(restify.fullResponse()).use(restify.bodyParser())

server.get('/user', function (req, res, next) {
	userSave.find({}, function (error, users) {
		res.send(users)
	})
})

server.get('/user/:id', function (req, res, next) {
	userSave.findOne({ _id: req.params.id }, function (error, user) {
	if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
		if (user) {
			res.send(user)
		} else {
			res.send(404)
		}
	})
})

server.post('/user', function (req, res, next) {
	if (req.params.firstName === undefined)
	{
		return next(new restify.InvalidArgumentError('First name must be supplied'))
	}
	if(req.params.secondName === undefined)
	{
		return next(new restify.InvalidArgumentError('Second name must be supplied'))
	}
	if(req.params.username === undefined)
	{
		return next(new restify.InvalidArgumentError('Username must be supplied'))
	}
	if(req.params.password === undefined)
	{
		return next(new restify.InvalidArgumentError('Password must be supplied'))
	}
	if(req.params.email === undefined)
	{
		return next(new restify.InvalidArgumentError('Email must be supplied'))
	}
	if(req.params.birthDate === undefined)
	{
		return next(new restify.InvalidArgumentError('Birth date must be supplied'))
	}
	if(req.params.citizenCard === undefined)
	{
		return next(new restify.InvalidArgumentError('Citizen card must be supplied'))
	}
	if(req.params.reputation === undefined)
	{
		return next(new restify.InvalidArgumentError('Reputation must be supplied'))
	}
	if(req.params.phoneNumber === undefined)
	{
		return next(new restify.InvalidArgumentError('Phone number must be supplied'))
	}
	userSave.create({ firstName: req.params.firstName, secondName: req.params.secondName, username: req.params.username,
	   password: req.params.password, email: req.params.email, birthDate: req.params.birthDate, citizenCard: req.params.citizenCard, reputation: req.params.reputation,
	   phoneNumber: req.params.phoneNumber, }, function (error, user)
	   {
			if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
				res.send(201, user)
		})
})

server.put('/user/:id', function (req, res, next) {
	if (req.params.password === undefined) 
	{
		return next(new restify.InvalidArgumentError('Password must be supplied'))
	}
	if(req.params.username === undefined)
	{
		return next(new restify.InvalidArgumentError('Username must be supplied'))
	}
	if(req.params.email === undefined)
	{
		return next(new restify.InvalidArgumentError('Email must be supplied'))
	}
	if(req.params.phoneNumber === undefined)
	{
		return next(new restify.InvalidArgumentError('Phone number must be supplied'))
	}
	userSave.update({ _id: req.params.id, username: req.params.username, email: req.params.email, phoneNumber: req.params.phoneNumber, password: req.params.password }, function (error, user)
	{
		if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send(200)
  })
})

server.del('/user/:id', function (req, res, next) {
  userSave.delete(req.params.id, function (error, user) {
    if (error) return next(new restify.InvalidArgumentError(JSON.stringify(error.errors)))
    res.send()
  })
})
