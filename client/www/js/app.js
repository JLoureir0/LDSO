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
          templateUrl: "templates/registo.html",
          controller: "registerCtrl"
        }
      }
    })
    .state('menu.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
          controller: "loginCtrl"
        }
      }
    }).state('menu.share-trip', {
      url: "/share-trip",
      views: {
        'menuContent' :{
          templateUrl: "templates/share-trip.html",
          controller: "shareTripCtrl"
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
          templateUrl: "templates/search-trip.html",
          controller: "searchTripCtrl"
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
    if(window.localStorage.getItem('has_run') == null) {
      window.localStorage.setItem('has_run', 'true');
      $urlRouterProvider.otherwise("/welcome");
    } else {
      $urlRouterProvider.otherwise("/menu/login");  
    }

});

app.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate, $state) {

  $scope.items = [
    {item: 'As tuas viagens'},
    {item: 'Procurar viagens'},
    {item: 'Partilhar viagem'},
    {item: 'Mensagens'},
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
        showDialog();
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


  /*********Close the application***********/

  //Function that will show popup asking if user wants to exit application or not
  function showDialog() {
    navigator.notification.beep(1);
    navigator.notification.confirm("Deseja sair da aplicação?", exitApplication, "Sair", "Sim, Não");
  }

  // If the user clicks yes the application will close
  function exitApplication(buttonIndex) {
    if(buttonIndex == 1) {
      navigator.app.exitApp();
    }
  }

  /**************************************/

});



app.controller('SlideController', function($scope, $state){
  // When the last slide goes right the app opens
  $scope.onSwipeRight = function() {
    $state.go('menu.login');
  }

});

app.controller('searchTripCtrl', function($scope, $http) {

  $scope.startPoint = "";

  $scope.getCurrentLocation = function() {
    document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  function onSuccess(position) {

    var latitude = "";
    var longitude = "";

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var url = "http://api.geonames.org/findNearbyJSON?lat=" + latitude + "&lng=" + longitude + "&username=ldso_14";
    $http.get(url).
      success(function(data, status, headers, config) {
        $scope.startPoint = data.geonames[0].toponymName;
        document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
      }).
      error(function(data, status, headers, config) {
        alert('Error, system was unable to fetch gps informations');
        document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
      });    
  }

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }
});


app.controller('loginCtrl', function($scope) {

  $scope.username = "";
  $scope.password = "";

  $scope.submitLogin = function() {
    console.log("username: " + $scope.username + " password: " + $scope.password);

    var jsonLogin = {
      "username" : $scope.username,
      "password" : $scope.password
    };
    var json = JSON.stringify(jsonLogin);

  }
});

app.controller('shareTripCtrl', function($scope, $http) {

  $scope.startPoint = "";
  $scope.destination = "";
  $scope.isFragile = false;
  $scope.isFlamable = false;
  $scope.isLarge = false;
  $scope.minPrice = "";
  $scope.maxDeviation = "";

  $scope.getCurrentLocation = function() {
    document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }

  function onSuccess(position) {

    var latitude = "";
    var longitude = "";


    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    var url = "http://api.geonames.org/findNearbyJSON?lat=" + latitude + "&lng=" + longitude + "&username=ldso_14";
    $http.get(url).
      success(function(data, status, headers, config) {
        $scope.startPoint = data.geonames[0].toponymName;
        document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
      }).
      error(function(data, status, headers, config) {
        alert('Error, system was unable to fetch gps informations');
        document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
      });    
  }

  function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }

  $scope.shareTripSubmit = function() {
      var jsonShareTrip = {
      "startPoint" : $scope.startPoint,
      "destination" : $scope.destination,
      "isFragile" : $scope.isFragile,
      "isFlamable" : $scope.isFlamable,
      "isLarge" : $scope.isLarge,
      "minPrice" : $scope.minPrice,
      "maxDeviation" : $scope.maxDeviation
    };
    var json = JSON.stringify(jsonShareTrip);
    console.log(json);
  }

});

app.controller('registerCtrl', function($scope) {

  $scope.name = "";
  $scope.lastName = "";
  $scope.username = "";
  $scope.password = "";
  $scope.confirmPassword = "";
  $scope.email = "";
  $scope.phone = "";
  $scope.idNumber = "";
  $scope.birthdate = "";

  $scope.confirmPasswordCallback = function() {
    if($scope.password <8 || $scope.confirmPassword <8) {
      console.log("Password must have at least 8 characters");
    }
    else if($scope.password === $scope.confirmPassword) {
      console.log("Passwords do correspond");
    } else {
      console.log("Passwords do not correspond");
    }
  }

  $scope.submitRegister = function() {
    console.log("name: " + $scope.name + " lastName: " + $scope.lastName + " username: " + $scope.username); 
  
    var jsonRegister = {
      "name" : $scope.name,
      "lastName" : $scope.lastName,
      "username" : $scope.username,
      "password" : $scope.password,
      "email" : $scope.email,
      "birthdate" : $scope.birthdate,
      "citizenCard" : $scope.idNumber,
      "phoneNumber" : $scope.phone
    };
    var json = JSON.parse(jsonRegister);

  }

});





