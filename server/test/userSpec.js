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

var authorization = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');

var client  = restify.createJsonClient({
  url: 'http://localhost:3000',
  headers: { 'Authorization': authorization }
});

describe('/users/:id.json', function() {
  var url;

  before(function(done) {
    client.post('/users.json', user, function(err, req, res, obj) {
      user = obj;

      url = '/users/' + user._id + '.json';
      done();
    });
  });

  describe('get request', function() {

    it('should return 404 if url is a substring of /users/:id.json', function(done) {
      client.get('/asdasdasd' + url, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(404);
        client.get(url + 'asdasdas', function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
    it('should return 404 if user id is invalid', function(done) {
      client.get('/users/invalid.json', function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
    it('should return 200 if user id is valid', function(done) {
      client.get(url, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return a json with a data property', function(done) {
      client.get(url, function(err, req, res, obj) {
        expect(obj).to.have.a.property('data');
        done();
      });
    });
    it('should return an object in the data property', function(done) {
      client.get(url, function(err, req, res, obj) {
        expect(typeof obj.data).to.be.equal('object');
        expect(obj.data).not.to.be.an.instanceof(Array);
        done();
      });
    });
    it('should return the correct user in the data object', function(done) {
      client.get(url, function(err, req, res, obj) {
        expect(obj.data).to.be.deep.equal(user);
        done();
      });
    });
  });

  describe('put request', function() {

    it('should return 404 if url is a substring of /users/:id.json', function(done) {
      client.put('/asdasdasd' + url, {}, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(404);
        client.put(url + 'asdasdas', {}, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
    it('should return 404 if user id is invalid', function(done) {
      client.put('/users/invalid.json', {}, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
    it('should return 200 if user id is valid', function(done) {
      client.put(url, {}, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should return the user on update', function(done) {
      user.phone_number = '987654321';

      client.put(url, { phone_number: '987654321' }, function(err, req, res, obj) {
        expect(obj).to.be.deep.equal(user);
        done();
      });
    });
    it('should return 409 and an error message if password is invalid', function(done) {
      client.put(url, { password: 'passwd' }, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Password must be a string with at least 8 characters');
        done();
      });
    });
    it('should return 409 and an error message if email is invalid', function(done) {
      client.put(url, { email: 'invalid' }, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Email must be a string and valid');
        done();
      });
    });
    it('should return 409 and an error message if phone_number is invalid', function(done) {
      client.put(url, { phone_number: '123456' }, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Phone number must be a string with only 9 numbers');
        done();
      });
    });
    it('should return 409 and an error message if home_town is invalid', function(done) {
      client.put(url, { home_town: 'inval1d' }, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Home town must be a string with only letters');
        done();
      });
    });
    it('should return 409 and an error message if biography is invalid', function(done) {
      client.put(url, { biography: '' }, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Biography must be a string with a maximum of 200 characters');
        done();
      });
    });
    it('should only parse the correct attributes', function(done) {
      client.put(url, { invalid: 'invalid' }, function(err, req, res, obj) {
        expect(obj).to.be.deep.equal(user);
        done();
      });
    });
  });

  describe('delete request', function() {

    it('should return 404 if url is a substring of /users/:id.json', function(done) {
      client.del('/asdasdasd' + url, function(err, req, res) {
        expect(res.statusCode).to.be.equal(404);
        client.del(url + 'asdasdas', function(err, req, res) {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
    it('should return 200 if user id is valid and delete him', function(done) {
      client.del(url, function(err, req, res) {
        expect(res.statusCode).to.be.equal(200);
        client.get(url, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(404);
          done();
        });
      });
    });
    it('should return 404 if user id is invalid', function(done) {
      client.del('/users/invalid.json', function(err, req, res) {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});
