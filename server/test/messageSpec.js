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

var message = {
  subject : 'Who are you?',
  message : 'Who the f*** are you?'
};

var authorization = 'Basic ' + new Buffer(user.username + ':' + user.password).toString('base64');

var client  = restify.createJsonClient({
  url: 'http://localhost:3000',
  headers: { 'Authorization': authorization }
});

describe('/users/:userid/messages/:messageid.json', function() {
  var url;

  before(function(done) {
    client.post('/users.json', user, function(err, req, res, obj) {
      user = obj;
      client.post('/users/' + user._id + '/messages.json', message, function(err, req, res, obj) {
        message = obj;
        url = '/users/' + user._id + '/messages/' + message._id + '.json';
        done();
      });
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
    it('should return 401 if user id is invalid', function(done) {
      client.get('/users/INVAL1D/messages/1.json', function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(401);
        done();
      });
    });
    it('should return 404 if the message id is invalid', function(done) {
      client.get('/users/' + user._id + '/messages/INVAL1D.json', function(err, req, res, obj) {
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
    it('should return the correct message in the data object', function(done) {
      client.get(url, function(err, req, res, obj) {
        message.unread = obj.data.unread;
        expect(obj.data).to.be.deep.equal(message);
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
      client.del('/users/' + user._id + '/messages/INVAL1D.json', function(err, req, res) {
        expect(res.statusCode).to.be.equal(404);
        done();
      });
    });
  });
});
