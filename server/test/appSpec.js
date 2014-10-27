var expect = require('chai').expect;
var restify = require('restify');

var client = restify.createJsonClient( {
  url: 'http://localhost:3000'
});

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
  });
});
