var expect  = require('chai').expect;
var restify = require('restify');

var client  = restify.createJsonClient( { url: 'http://localhost:3000' });

var user    = {
  first_name   : 'John',
  last_name    : 'Doe',
  username     : 'john_doe',
  password     : '123456789',
  email        : 'johndoe@example.org',
  birth_date   : '1980/12/12',
  citizen_card : '11111111',
  phone_number : '123456789'
};

describe('Server', function() {

  it('should have Content-Type: application/json; charset=utf-8', function(done) {
    client.get('/users.json', function(err, req, res, obj) {
      expect(res.headers['content-type']).to.be.equal('application/json; charset=utf-8');
      done();
    });
  });

  describe('/users.json', function() {
    describe('get request', function() {
      it('should return 200', function(done) {
        client.get('/users.json', function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });
      it('should return a json with a data property', function(done) {
        client.get('/users.json', function(err, req, res, obj) {
          expect(obj).to.have.a.property('data');
          done();
        });
      });
      it('should return an array in the data property', function(done) {
        client.get('/users.json', function(err, req, res, obj) {
          expect(obj.data).to.be.an.instanceof(Array);
          done();
        });
      });
    });

    describe('post request', function() {
      it('should return 201 on create', function(done) {
        client.post('/users.json', user, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
      });
      it('should return the user on create and his reputation equals to zero', function(done) {
        client.post('/users.json', user, function(err, req, res, obj) {
          var response_user = JSON.parse(JSON.stringify(user));
          response_user._id = obj._id;
          response_user.reputation = 0;
          expect(obj).to.be.deep.equal(response_user);
          done();
        });
      });
      it('should return 409 and an error message if no first_name passed', function(done) {
        var user_no_first_name = JSON.parse(JSON.stringify(user));
        delete user_no_first_name.first_name;
        client.post('/users.json', user_no_first_name, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('First name must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if first_name is invalid', function(done) {
        var user_invalid_first_name = JSON.parse(JSON.stringify(user));
        user_invalid_first_name.first_name = 'Inval1d';
        client.post('/users.json', user_invalid_first_name, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('First name must be a string with only letters');
          done();
        });
      });
      it('should return 409 and an error message if no last_name passed', function(done) {
        var user_no_last_name = JSON.parse(JSON.stringify(user));
        delete user_no_last_name.last_name;
        client.post('/users.json', user_no_last_name, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Last name must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if last_name is invalid', function(done) {
        var user_invalid_last_name = JSON.parse(JSON.stringify(user));
        user_invalid_last_name.last_name = 'Inval1d';
        client.post('/users.json', user_invalid_last_name, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Last name must be a string with only letters');
          done();
        });
      });
      it('should return 409 and an error message if no username passed', function(done) {
        var user_no_username = JSON.parse(JSON.stringify(user));
        delete user_no_username.username;
        client.post('/users.json', user_no_username, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Username must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if username is invalid', function(done) {
        var user_invalid_username = JSON.parse(JSON.stringify(user));
        user_invalid_username.username = ['john_doe'];
        client.post('/users.json', user_invalid_username, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Username must be a string');
          done();
        });
      });
      it('should return 409 and an error message if no password passed', function(done) {
        var user_no_password = JSON.parse(JSON.stringify(user));
        delete user_no_password.password;
        client.post('/users.json', user_no_password, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Password must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if password is invalid', function(done) {
        var user_invalid_password = JSON.parse(JSON.stringify(user));
        user_invalid_password.password = ['password'];
        client.post('/users.json', user_invalid_password, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Password must be a string');
          done();
        });
      });
      it('should return 409 and an error message if no email passed', function(done) {
        var user_no_email = JSON.parse(JSON.stringify(user));
        delete user_no_email.email;
        client.post('/users.json', user_no_email, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Email must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if email is invalid', function(done) {
        var user_invalid_email = JSON.parse(JSON.stringify(user));
        user_invalid_email.email = 'Inval1d';
        client.post('/users.json', user_invalid_email, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Email must be a string and valid');
          done();
        });
      });
      it('should return 409 and an error message if no birth_date passed', function(done) {
        var user_no_birth_date = JSON.parse(JSON.stringify(user));
        delete user_no_birth_date.birth_date;
        client.post('/users.json', user_no_birth_date, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Birth date must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if birth_date is invalid', function(done) {
        var user_invalid_birth_date = JSON.parse(JSON.stringify(user));
        user_invalid_birth_date.birth_date = 'Inval1d';
        client.post('/users.json', user_invalid_birth_date, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Birth date must be a string with the format yyyy/mm/dd');
          done();
        });
      });
      it('should return 409 and an error message if no citizen_card passed', function(done) {
        var user_no_citizen_card = JSON.parse(JSON.stringify(user));
        delete user_no_citizen_card.citizen_card;
        client.post('/users.json', user_no_citizen_card, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Citizen card must be supplied');
          done();
        });
      });
      it('should return 409 and an error message if no phone_number passed', function(done) {
        var user_no_phone_number = JSON.parse(JSON.stringify(user));
        delete user_no_phone_number.phone_number;
        client.post('/users.json', user_no_phone_number, function(err, req, res, obj) {
          expect(res.statusCode).to.be.equal(409);
          expect(obj.message).to.be.equal('Phone number must be supplied');
          done();
        });
      });
      it('should only parse the correct attributes', function(done) {
        var user_with_another_attribute = JSON.parse(JSON.stringify(user));
        user_with_another_attribute.another_attribute = 'ATTRIBUTE';
        var response_user = JSON.parse(JSON.stringify(user));

        client.post('/users.json', user_with_another_attribute, function(err, req, res, obj) {
          response_user._id = obj._id;
          response_user.reputation = 0;
          expect(obj).to.be.deep.equal(response_user);
          done();
        });
      });
    });
  });
});
