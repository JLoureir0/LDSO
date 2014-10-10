var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider){

  $stateProvider
    .state('welcome', {
      url: "/welcome",
      views: {
        'applicationContent' :{
          controller: "SlideController",
          templateUrl: "templates/welcome.html"
        }
      }
    })
    .state('menu', {
      url: "/menu",
      abstract: true,
      views: {
        'applicationContent' :{
          templateUrl: "templates/menu.html",
          controller: "toogleCtrl"
        }
      }
    })
    .state('menu.registo', {
      url: "/registo",
      views: {
        'menuContent' :{
          templateUrl: "templates/registo.html"
        }
      }
    })
    .state('menu.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
    });

    //Default startup screen
    $urlRouterProvider.otherwise("welcome");
});

app.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate) {

    $scope.items = [
    {item: 'As tuas viagens'},
    {item: 'Procurar viagens'},
    {item: 'Partilhar viagem'},
    {item: 'Sair'},
  ];

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }
});


app.controller('SlideController', function($scope, $state){
  // When the last slide goes right the app opens
  $scope.onSwipeRight = function() {
    $state.go('menu.login');
  }

})

