// Define all your modules with no dependencies
angular.module('registerModule', []);
angular.module('loginModule', []);
angular.module('welcomeModule', []);
angular.module('tripsModule', []);
angular.module('profileModule', []);
angular.module('messageModule', []);

// Lastly, define your "main" module and inject all other modules as dependencies
angular.module('starter',
  [
    'registerModule',
    'loginModule',
    'welcomeModule',
    'profileModule',
    'tripsModule',
    'messageModule',
    'ionic'
  ]
);