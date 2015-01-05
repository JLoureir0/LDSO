var expect   = require('chai').expect;
var restify  = require('restify');

var sender   = {
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

var receiver = {
  first_name   : 'Jane',
  last_name    : 'Doe',
  username     : 'jane_doe',
  password     : '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225',
  email        : 'janedoe@example.org',
  birth_date   : '1980/12/12',
  citizen_card : '11111112',
  phone_number : '987654321',
  home_town    : 'Porto'
};

var message = {
  subject : 'Who are you?',
  message : 'Who the f*** are you?'
};

var sender_authorization   = 'Basic ' + new Buffer(sender.username + ':' + sender.password).toString('base64');
var receiver_authorization = 'Basic ' + new Buffer(receiver.username + ':' + receiver.password).toString('base64');

var sender_client  = restify.createJsonClient({
  url: 'http://localhost:3000',
  headers: { 'Authorization': sender_authorization }
});

var receiver_client  = restify.createJsonClient({
  url: 'http://localhost:3000',
  headers: { 'Authorization': receiver_authorization }
});

var url = '/users/' + receiver.username + '/messages.json';

describe(url, function() {

  before(function(done) {
    sender_client.post('/users.json', sender, function(err, req, res, obj) {
      sender_client.post('/users.json', receiver, function(err, req, res, obj) {
        done();
      });
    });
  });

  describe('post request', function() {
    it('should return 201 and the message on create', function(done) {
      sender_client.post(url, message, function(err, req, res, obj) {
        var response_message       = JSON.parse(JSON.stringify(message));
        response_message._id       = obj._id;
        response_message.sender    = sender.username;
        response_message.receiver  = receiver.username;
        response_message.unread    = 'true';
        response_message.week_day  = obj.week_day;
        response_message.month_day = obj.month_day;
        response_message.month     = obj.month;
        response_message.year      = obj.year;
        response_message.hour      = obj.hour;
        response_message.minute    = obj.minute;
        expect(res.statusCode).to.be.equal(201);
        expect(obj).to.be.deep.equal(response_message);
        done();
      });
    });
    it('should return 409 and an error message if no subject passed', function(done) {
      var message_no_subject = JSON.parse(JSON.stringify(message));
      delete message_no_subject.subject;
      sender_client.post(url, message_no_subject, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Subject must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if subject is invalid', function(done) {
      var message_invalid_subject = JSON.parse(JSON.stringify(message));
      message_invalid_subject.subject = '';
      sender_client.post(url, message_invalid_subject, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Subject must be a string with a maximum of 30 characters');
        done();
      });
    });
    it('should return 409 and an error message if no message passed', function(done) {
      var message_no_message = JSON.parse(JSON.stringify(message));
      delete message_no_message.message;
      sender_client.post(url, message_no_message, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Message must be supplied');
        done();
      });
    });
    it('should return 409 and an error message if message is invalid', function(done) {
      var message_invalid_message = JSON.parse(JSON.stringify(message));
      message_invalid_message.message = '';
      sender_client.post(url, message_invalid_message, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(409);
        expect(obj.message).to.be.equal('Message must be a string with a maximum of 500 characters');
        done();
      });
    });
    it('should only parse the correct attributes', function(done) {
      var message_with_another_attribute = JSON.parse(JSON.stringify(message));
      message_with_another_attribute.another_attribute = 'ATTRIBUTE';
      var response_message = JSON.parse(JSON.stringify(message));

      sender_client.post(url, message_with_another_attribute, function(err, req, res, obj) {
        var response_message       = JSON.parse(JSON.stringify(message));
        response_message._id       = obj._id;
        response_message.sender    = sender.username;
        response_message.receiver  = receiver.username;
        response_message.unread    = 'true';
        response_message.week_day  = obj.week_day;
        response_message.month_day = obj.month_day;
        response_message.month     = obj.month;
        response_message.year      = obj.year;
        response_message.hour      = obj.hour;
        response_message.minute    = obj.minute;
        expect(res.statusCode).to.be.equal(201);
        expect(obj).to.be.deep.equal(response_message);
        done();
      });
    });
  });

  describe('get request', function() {
    it('should return 200', function(done) {
      receiver_client.get(url, function(err, req, res, obj) {
        expect(res.statusCode).to.be.equal(200);
        done();
      });
    });
    it('should have Content-Type: application/json; charset=utf-8', function(done) {
      receiver_client.get(url, function(err, req, res, obj) {
        expect(res.headers['content-type']).to.be.equal('application/json; charset=utf-8');
        done();
      });
    });
    it('should return a json with a data property', function(done) {
      receiver_client.get(url, function(err, req, res, obj) {
        expect(obj).to.have.a.property('data');
        done();
      });
    });
    it('should return an array in the data property', function(done) {
      receiver_client.get(url, function(err, req, res, obj) {
        expect(obj.data).to.be.an.instanceof(Array);
        done();
      });
    });
  });

  after(function(done) {
    sender_client.del('/users/' + sender.username + '.json', function(err, req, res) {
      done();
    });
  });
});
