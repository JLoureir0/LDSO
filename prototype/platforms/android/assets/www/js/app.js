var app = angular.module('starter', ['ionic']);

app.config(function($stateProvider, $urlRouterProvider) {

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
    }).state('menu.share-trip', {
      url: "/share-trip",
      views: {
        'menuContent' :{
          templateUrl: "templates/share-trip.html"
        }
      }
    }).state('menu.my-trips', {
      url: "/my-trips",
      views: {
        'menuContent' :{
          templateUrl: "templates/my-trips.html"
        }
      }
    }).state('menu.search-trip', {
      url: "/search-trip",
      views: {
        'menuContent' :{
          templateUrl: "templates/search-trip.html"
        }
      }
    }).state('menu.messages', {
      url: '/messages',
      views: {
        'menuContent' :{
          templateUrl: "templates/messages.html"
        }
      }
    }).state('menu.message', {
      url: '/message',
      views: {
        'menuContent' :{
          templateUrl: "templates/message.html"
        }
      }
    }).state('menu.profile', {
      url: '/profile',
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html"
        }
      }
    }).state('menu.my-trip', {
      url: "/my-trip",
      views: {
        'menuContent' :{
          templateUrl: "templates/my-trip.html"
        }
      }
    });

    //Default startup screen
    $urlRouterProvider.otherwise("welcome");
});

app.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate, $state) {

  $scope.items = [
    {item: 'As tuas viagens'},
    {item: 'Procurar viagens'},
    {item: 'Partilhar viagem'},
    {item: 'Mensagens'},
    {item: 'Perfil'},
    {item: 'Sair'}
  ];

    /*Temporary trip*/
  $scope.trip = {
     startPoint: 'Porto',
     destPoint: 'Alfragide',
     weekDay: 'Qui.',
     monthDay: '21',
     month: 'Set',
     startTime: {hour: '9', minute: '30'},
     scheduleEndTime: {hour: '15', minute: '15'},
     objectTypes: ['grandes dimensões', 'inflamável', 'frágil'],
     minPrice: '4',
     maxDesv: '10'
  };

  /*Temporary trips*/
  $scope.trips = [
      {startPoint: 'Porto',
       destPoint: 'Alfragide',
       weekDay: 'Qui.',
       monthDay: '21',
       month: 'Set',
       startTime: {hour: '9', minute: '30'},
       scheduleEndTime: {hour: '15', minute: '15'},
       objectTypes: ['grandes dimensões', 'inflamável'],
       minPrice: '4',
       maxDesv: '10'
      },
      {startPoint: 'Porto',
       destPoint: 'Lisboa',
       weekDay: 'Qua.',
       monthDay: '20',
       month: 'Set',
       startTime: {hour: '19', minute: '30'},
       scheduleEndTime: {hour: '23', minute: '15'},
       objectTypes: ['frágil', 'inflamável'],
       minPrice: '5',
       maxDesv: '20'
      }
  ];

  $scope.showRegisterFooter = false;
  $scope.showLoginFooter = false;

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  }

  $scope.selectItem = function($index) {
    switch($index) {
    case 0:
        $state.go('menu.my-trips');
        break;
    case 1:
        $state.go('menu.search-trip');
        break;
    case 2:
        $state.go('menu.share-trip');
        break;
    case 3:
        $state.go('menu.messages');
        break;
    case 4:
        $state.go('menu.profile');
        break;
    case 5:
        showDialog();
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
        break;
    default:
        break;
    } 
  }
 

  $scope.loadFooters = function() {

    if($state.current.url === '/login')
      $scope.showRegisterFooter = true;
    else
      $scope.showRegisterFooter = false;

    if($state.current.url === '/registo')
      $scope.showLoginFooter = true;
    else 
      $scope.showLoginFooter = false;
  }

});


app.controller('SlideController', function($scope, $state){
  // When the last slide goes right the app opens
  $scope.onSwipeRight = function() {
    $state.go('menu.login');
  }

})


//Function that will show popup asking if user wants to exit application or not
function showDialog() {
  navigator.notification.confirm("Deseja sair da aplicação?", exitApplication, "Sair", "Sim, Não");
}

function exitApplication(buttonIndex) {
  navigator.notification.beep(1);
  if(buttonIndex == 1) {
    navigator.app.exitApp();
  }
}

function onSuccess(position) {
  alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
}


function onError(error) {
  alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}






