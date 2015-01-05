var restify = require('restify');

exports.handle_params = function(req, res, next) {
  var message  = req.params;
  var sender   = req.user.id;
  var receiver = req.params[0];

  verify_message_attributes(message, next);

  req.params = parse_message_params(message);

  var now = new Date();
  var week_days = ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'];
  var months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  req.params.sender    = sender;
  req.params.receiver  = receiver;
  req.params.unread    = 'true';
  req.params.week_day  = week_days[ now.getDay() ];
  req.params.month_day = now.getDate();
  req.params.month     = months[ now.getMonth() ];
  req.params.year      = now.getFullYear();
  req.params.hour      = now.getHours();
  req.params.minute    = now.getMinutes();

  next();
};

function verify_message_attributes(message, next) {
  parse_subject(message.subject, next);
  parse_message(message.message, next);
}

function parse_subject(subject, next) {
  if(subject === undefined)
    return next(new restify.InvalidArgumentError('Subject must be supplied'));

  if(typeof subject !== 'string' || subject.length < 1 || subject.length > 200)
    return next(new restify.InvalidArgumentError('Subject must be a string with a maximum of 30 characters'));
}

function parse_message(message, next) {
  if(message === undefined)
    return next(new restify.InvalidArgumentError('Message must be supplied'));

  if(typeof message !== 'string' || message.length < 1 || message.length > 200)
    return next(new restify.InvalidArgumentError('Message must be a string with a maximum of 500 characters'));
}

function parse_message_params(message) {
  var new_message = {};

  var message_attributes = [
    'subject',
    'message'
  ];

  for(var key in message) {
    if(message_attributes.indexOf(key) !== -1)
        new_message[key] = message[key];
  }

  return new_message;
}
