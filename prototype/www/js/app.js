
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
    });

    $urlRouterProvider.otherwise("/welcome");
});

app.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.items = [
        {item:'As tuas viagens'},
        {item:'Procurar viagens'},
        {item:'Partilhar viagem'}
  ];
});

app.controller('SlideController', function($scope, $ionicSlideBoxDelegate, $state){

  $scope.myActiveSlide=1;

  
  $scope.slideChanged = function(index) {
    var currentIndex = $ionicSlideBoxDelegate.currentIndex();

    //console.log($ionicSlideBoxDelegate.next());

    if(currentIndex == 3) {
      
      $state.go('menu');
    }
  }

})

