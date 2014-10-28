var expect = require('chai').expect;
var restify = require('restify');

var client = restify.createJsonClient( {
  url: 'http://localhost:3000'
});

var user = {
  firstName: 'John',
  lastName: 'Doe',
  username: 'john_doe',
  password: '123456789',
  email: 'johndoe@example.org',
  birthdate: '12-12-1980',
  citizenCard: '11111111',
  phoneNumber: '123456789'
}

describe('Server', function() {
  describe('/user.json', function() {
    describe('get request', function() {
      it('should return 200', function(done) {
        client.get('/user.json', function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
      it('should return a json with a data property', function(done) {
        client.get('/user.json', function(err, req, res, obj) {
          expect(JSON.parse(obj)).to.have.a.property('data');
          done();
        });
      });
      it('should return an array in the data property', function(done) {
        client.get('/user.json', function(err, req, res, obj) {
          expect(JSON.parse(obj).data).to.be.an.instanceof(Array);
          done();
        });
      });
    });
    describe('post request', function() {
      it('should return 201 on create', function(done) {
        client.post('/user.json', user, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
      });
      it('should return the user on create', function(done) {
        client.post('/user.json', user, function(err, req, res, obj) {
          user._id = obj._id;
          expect(obj).to.be.deep.equal(user);
          done();
        });
      });
    });
  });
});
