var expect  = require('chai').expect;
var restify = require('restify');

var client  = restify.createJsonClient( { url: 'http://localhost:3000' });

describe('Server', function() {

  it('should have Content-Type: application/json; charset=utf-8', function(done) {
    client.get('/users.json', function(err, req, res, obj) {
      expect(res.headers['content-type']).to.be.equal('application/json; charset=utf-8');
      done();
    });
  });

});
