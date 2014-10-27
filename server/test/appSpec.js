var expect = require('chai').expect;
var restify = require('restify');

describe('Server', function() {
  describe('/user.json', function() {
    it('should return 200 on a get request', function(done) {
      var client = restify.createJsonClient( {
        url: 'http://localhost:3000'
      });

      client.get('/user.json', function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
  });
});
