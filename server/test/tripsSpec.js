var expect  = require('chai').expect;
var restify = require('restify');

var user    = {
  first_name   : 'John',
  last_name    : 'Doe',
  username     : 'john_doe',
  password     : '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',
  email        : 'johndoe@example.org',
  birth_date   : '1980/12/12',
  citizen_card : '11111111',
  phone_number : '123456789',
  home_town    : 'Porto'
};

var trip    = {
  starting_point : 'Porto',
  destination    : 'Vila Real',
  fragile        : 'true',
  flamable       : 'false',
  big_dimensions : 'false',
  vehicle        : '1',
  min_price      : '2',
  max_deviation  : '15',
};

var authorization = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');

var client  = restify.createJsonClient({
  url: 'http://localhost:3000',
  headers: { 'Authorization': authorization }
});

describe('/trips.json', function() {

  before(function(done) {
    client.post('/users.json', user, function(err, req, res, obj) {
      done();
    });
  });

  describe('post request', function() {
    it('should return 201 and the trip on create', function(done) {
      client.post('/trips.json', trip, function(err, req, res, obj) {
        var response_trip = JSON.parse(JSON.stringify(trip));
        response_trip._id = obj._id;
        expect(res.statusCode).to.be.equal(201);
        expect(obj).to.be.deep.equal(response_trip);
        done();
      });
    });
    it('should return 409 and an error message if no starting_point passed', function(done) {
      var trip_no_starting_point = JSON.parse(JSON.stringify(trip));
      delete trip_no_starting_point.starting_point;
      client.post('/trips.json', trip_no_starting_point, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Starting point must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if starting_point is invalid', function(done) {
      var trip_invalid_starting_point = JSON.parse(JSON.stringify(trip));
      trip_invalid_starting_point.starting_point = 'Inval1d';
      client.post('/trips.json', trip_invalid_starting_point, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Starting point must be a string with only letters');
        done();
      });
    });
    it('should return 409 and an error message if no destination passed', function(done) {
      var trip_no_destination = JSON.parse(JSON.stringify(trip));
      delete trip_no_destination.destination;
      client.post('/trips.json', trip_no_destination, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Last name must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if destination is invalid', function(done) {
      var trip_invalid_destination = JSON.parse(JSON.stringify(trip));
      trip_invalid_destination.destination = 'Inval1d';
      client.post('/trips.json', trip_invalid_destination, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Destination must be a string with only letters');
        done();
      });
    });
    it('should return 409 and an error message if no fragile passed', function(done) {
      var trip_no_fragile = JSON.parse(JSON.stringify(trip));
      delete trip_no_fragile.fragile;
      client.post('/trips.json', trip_no_fragile, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Fragile must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if fragile is invalid', function(done) {
      var trip_invalid_fragile = JSON.parse(JSON.stringify(trip));
      trip_invalid_fragile.fragile = 'Inval1d';
      client.post('/trips.json', trip_invalid_fragile, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Fragile must be true or false');
        done();
      });
    });
    it('should return 409 and an error message if no flamable passed', function(done) {
      var trip_no_flamable = JSON.parse(JSON.stringify(trip));
      delete trip_no_flamable.flamable;
      client.post('/trips.json', trip_no_flamable, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Flamable must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if flamable is invalid', function(done) {
      var trip_invalid_flamable = JSON.parse(JSON.stringify(trip));
      trip_invalid_flamable.flamable = 'Inval1d';
      client.post('/trips.json', trip_invalid_flamable, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Flamable must be true or false');
        done();
      });
    });
    it('should return 409 and an error message if no big_dimensions passed', function(done) {
      var trip_no_big_dimensions = JSON.parse(JSON.stringify(trip));
      delete trip_no_big_dimensions.big_dimensions;
      client.post('/trips.json', trip_no_big_dimensions, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Big dimensions must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if big_dimensions is invalid', function(done) {
      var trip_invalid_big_dimensions = JSON.parse(JSON.stringify(trip));
      trip_invalid_big_dimensions.big_dimensions = 'Inval1d';
      client.post('/trips.json', trip_invalid_big_dimensions, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Big dimensions must be true or false');
        done();
      });
    });
    it('should return 409 and an error message if no vehicle passed', function(done) {
      var trip_no_vehicle = JSON.parse(JSON.stringify(trip));
      delete trip_no_vehicle.vehicle;
      client.post('/trips.json', trip_no_vehicle, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Vehicle must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if vehicle is invalid', function(done) {
      var trip_invalid_vehicle = JSON.parse(JSON.stringify(trip));
      trip_invalid_vehicle.vehicle = 'Inval1d';
      client.post('/trips.json', trip_invalid_vehicle, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Vehicle must be 0 or 1');
        done();
      });
    });
    it('should return 409 and an error message if no min_price passed', function(done) {
      var trip_no_min_price = JSON.parse(JSON.stringify(trip));
      delete trip_no_min_price.min_price;
      client.post('/trips.json', trip_no_min_price, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Minimum price must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if min_price is invalid', function(done) {
      var trip_invalid_min_price = JSON.parse(JSON.stringify(trip));
      trip_invalid_min_price.min_price = '-1';
      client.post('/trips.json', trip_invalid_min_price, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Minimum price must be a number greater than zero');
        done();
      });
    });
    it('should return 409 and an error message if no max_deviation passed', function(done) {
      var trip_no_max_deviation = JSON.parse(JSON.stringify(trip));
      delete trip_no_max_deviation.max_deviation;
      client.post('/trips.json', trip_no_max_deviation, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Maximum deviation must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if max_deviation is invalid', function(done) {
      var trip_invalid_max_deviation = JSON.parse(JSON.stringify(trip));
      trip_invalid_max_deviation.max_deviation = '-1';
      client.post('/trips.json', trip_invalid_max_deviation, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Maximum deviation must be a number greater than zero');
        done();
      });
    });
    it('should only parse the correct attributes', function(done) {
      var trip_with_another_attribute = JSON.parse(JSON.stringify(trip));
      trip_with_another_attribute.another_attribute = 'ATTRIBUTE';
      var response_trip = JSON.parse(JSON.stringify(trip));

      client.post('/trips.json', trip_with_another_attribute, function(err, req, res, obj) {
        response_trip._id = obj._id;
        expect(obj).to.be.deep.equal(response_trip);
        done();
      });
    });
  });

  describe('get request', function() {
    it('should return 200', function(done) {
      client.get('/trips.json', function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should have Content-Type: application/json; charset=utf-8', function(done) {
      client.get('/trips.json', function(err, req, res, obj) {
        expect(res.headers['content-type']).to.be.equal('application/json; charset=utf-8');
        done();
      });
    });
    it('should return a json with a data property', function(done) {
      client.get('/trips.json', function(err, req, res, obj) {
        expect(obj).to.have.a.property('data');
        done();
      });
    });
    it('should return an array in the data property', function(done) {
      client.get('/trips.json', function(err, req, res, obj) {
        expect(obj.data).to.be.an.instanceof(Array);
        done();
      });
    });
  });

  after(function(done) {
    client.del('/users/' + user.username + '.json', function(err, req, res) {
      done();
    });
  });
});
