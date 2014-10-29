var expect  = require('chai').expect;
var restify = require('restify');

var client  = restify.createJsonClient( { url: 'http://localhost:3000' });

var user    = {
  first_name   : 'John',
  last_name    : 'Doe',
  username     : 'john_doe',
  password     : '123456789',
  email        : 'johndoe@example.org',
  birth_date   : '12-12-1980',
  citizen_card : '11111111',
  phone_number : '123456789'
};

describe('Server', function() {

  it('should have Content-Type: application/json; charset=utf-8', function(done) {
    client.get('/user.json', function(err, req, res, obj) {
      expect(res.headers['content-type']).to.be.equal('application/json; charset=utf-8');
      done();
    });
  });

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
          expect(obj).to.have.a.property('data');
          done();
        });
      });
      it('should return an array in the data property', function(done) {
        client.get('/user.json', function(err, req, res, obj) {
          expect(obj.data).to.be.an.instanceof(Array);
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
