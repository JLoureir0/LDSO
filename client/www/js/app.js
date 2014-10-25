document.write('<script src="/js/sha-256.js" type="text/javascript"></script>');
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
	}).state('menu.trip', {
		url: "/trip",
		views: {
			'menuContent' :{
				templateUrl: "templates/trip.html"
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

app.factory('makeRequest', function ($http, $q) {
	return {
		sendTrip: function(json) {
	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.post('http://localhost:3000/trip', json)
	            .then(function(response) {
	            	if (typeof response.data === 'object') {
	            		return response.data;
	            	} else {
	                        // invalid response
	                        return $q.reject(response.data);
	                    }
	                }, function(response) {
	                    // something went wrong
	                    return $q.reject(response.data);
	                }
	            );
	        },

	        getTrips: function() {
	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.get('http://localhost:3000/trip')
	            .then(function(response) {
	            	if (typeof response.data === 'object') {
	            		return response.data;
	            	} else {
	                        // invalid response
	                        return $q.reject(response.data);
	                    }
	                }, function(response) {
	                    // something went wrong
	                    return $q.reject(response.data);
	                }
	            );
	        }
	    };    
	}
);

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
		startPoint: 'Paranhos',
		destPoint: 'Lisboa',
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
		{startPoint: 'Paranhos',
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

/****************************************/

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

app.controller('shareTripCtrl', function($scope, $http, makeRequest) {

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

		//call service
		makeRequest.sendTrip(json).
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);
			}, function(error) {
				console.log(error);
			});
		}

	});

app.controller('registerCtrl', function($http, $scope) {

	$scope.name = "";
	$scope.lastName = "";
	$scope.username = "";
	$scope.password = "";
	$scope.confirmPassword = "";
	$scope.email = "";
	$scope.phone = "";
	$scope.idNumber = "";
	$scope.birthdate = "";

	function checkIfDifferente(arg1, arg2) {
		if(arg1 === arg2)
			return false;
		else
			return true;
	}

	$scope.validateNamesCallback = function(type) {

		var pattern = /^[A-Za-z]+$/;
	
		if(type === 'firstName') {
			if($scope.name.match(pattern))
				console.log("firstName is valid!");
			else
				console.log("firstName is NOT valid");
		} 
		else if(type === 'lastName') {
			if($scope.lastName.match(pattern)) {
				console.log("LasName is valid!");

				if(!checkIfDifferente($scope.name, $scope.lastName))
					console.log("Both firstName and lastName are NOT valid!");
			}
			else
				console.log("LastName is NOT valid")
		}
	}

	$scope.confirmPasswordCallback = function() {
		if($scope.password <8 || $scope.confirmPassword <8) {
			console.log("Password must have at least 8 characters");
		}
		else if($scope.password === $scope.confirmPassword) {
			console.log("Passwords do correspond");
			//encrypying password with sha-256
			//var passwordEncrypted = CryptoJS.SHA256($scope.password);
			//console.log(passwordEncrypted.toString());
		} else {
			console.log("Passwords do not correspond");
		}
	}

	$scope.validateEmailCallback = function() {

		var foundAt = false;
		var foundDot = false; 

		for (var i = 0, len = $scope.email.length; i < len; i++) {
 			if($scope.email[i] === '@')
 				foundAt = true;
 		 	else if($scope.email[i] === '.')
 		 		foundDot = true;
		}

		if(foundAt == true && foundDot == true) {
	    	var atpos = $scope.email.indexOf("@");
	    	var dotpos = $scope.email.lastIndexOf(".");
	    	if (atpos < 1 || dotpos < atpos+2 || dotpos + 2 >= $scope.email.length)
	        	console.log("Email address is NOT valid");
	        else
	        	console.log("Email address is valid!");			
		}
		else
			console.log("Email address is NOT valid")
	}

	$scope.validateNumbersCallback = function(type) {

		var pattern = /^\d{9}$/;

		if(type === 'phone') {
			if($scope.phone.match(pattern))
				console.log("Phone number is valid!");
			else
				console.log("Phone number is NOT valid");
		}
		else if(type === 'identification') {
			if($scope.idNumber.match(pattern)) {

				console.log("Identification number is valid!");

				if(!checkIfDifferente($scope.phone, $scope.idNumber))
					console.log("Both phone number and identification number are NOT valid!");
			}
			else
				console.log("Identification number is NOT valid!");
		}
	}

	$scope.validateDateCallback = function() {

		var pattern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

		if($scope.birthdate.match(pattern))
			console.log("birthdate is valid!");
		else
			console.log("birthdate is NOT valid!");
	}

	$scope.submitRegister = function() {
		console.log("name: " + $scope.name + " lastName: " + $scope.lastName + " username: " + $scope.username); 

		var jsonRegister = {
			"firstName" : $scope.name,
			"secondName" : $scope.lastName,
			"username" : $scope.username,
			"password" : $scope.password,
			"email" : $scope.email,
			"birthDate" : $scope.birthdate,
			"citizenCard" : $scope.idNumber,
			"reputation" : "0",
			"phoneNumber" : $scope.phone
		};


		var json = JSON.stringify(jsonRegister);
		
		$http.post('http://localhost:3000/user', json).
		success(function(data, status, headers, config) {
			console.log(data);
		}).
		error(function(data, status, headers, config) {
			console.log(data);
		}); 
	}

});





