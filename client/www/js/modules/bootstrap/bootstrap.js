// Define all your modules with no dependencies
angular.module('registerModule', []);
angular.module('loginModule', []);
angular.module('messagesModule', []);
angular.module('welcomeModule', []);
angular.module('profileModule', []);
angular.module('tripsModule', []);
angular.module('profileModule', []);

// Lastly, define your "main" module and inject all other modules as dependencies
angular.module('starter',
  [
    'registerModule',
    'loginModule',
    'messagesModule',
    'welcomeModule',
    'profileModule',
    'tripsModule',
    'profileModule',
    'ionic'
  ]
);