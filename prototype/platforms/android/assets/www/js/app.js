
var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('welcome', {
      url: "/welcome",
      templateUrl: "templates/welcome.html"
    })
    .state('menu', {
      url: "/menu",
      templateUrl: "templates/menu.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html"
    })
    .state('registo', {
      url: "/registo",
      templateUrl: "templates/registo.html"
    });

    //Default startup screen
    $urlRouterProvider.otherwise("/welcome");
});

// The same as $urlRouterProvider.otherwise("/welcome");
/*
app.run(['$state', function ($state) {
   $state.transitionTo('welcome');
}])
*/

app.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  
    $scope.items = [
      {item: 'As tuas viagens'},
      {item: 'Procurar viagens'},
      {item: 'Partilhar viagem'},
      {item: 'Sair'},
    ];
  }

  $scope.toggleLeftloggedOut = function() {
    $ionicSideMenuDelegate.toggleLeft();
    $scope.items = [
      {item: 'Sobre nós'},
      {item: 'Condições gerais'},
      {item: 'Política de privacidade'},
      {item: 'Confiança e Segurança'},
      {item: 'Perguntas Frequentes'},
      {item: 'Contactos'},
      {item: 'Sair'}
    ];
  }
});


app.controller('SlideController', function($scope, $state){
  // When the last slide goes right the app opens
  $scope.onSwipeRight = function() {
    $state.go('login');
  }

})

