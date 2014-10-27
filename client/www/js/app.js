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
	        },

	        register: function(json) {
	        	return $http.post('http://localhost:3000/user', json)
	        	.then(function(response){
	        		if(typeof response.data === 'object') {
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

	        getLocation: function(latitude, longitude) {
	        	return $http.get("http://api.geonames.org/findNearbyJSON?lat=" + latitude + "&lng=" + longitude + "&username=ldso_14")
	        	.then(function(response){
	        		if(typeof response.data === 'object') {
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

app.controller('searchTripCtrl', function($scope, $http, makeRequest) {

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

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				$scope.startPoint = data.geonames[0].toponymName;
				document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
			}, function(error) {
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

	$scope.confirmPasswordCallback = function() {
		if($scope.password.length <8)
			console.log("Password must have at least 8 characters");
		else
			console.log("Valid password");
	}

	$scope.submitLogin = function() {
		$scope.passwordEncrypted = CryptoJS.SHA256($scope.password);
		console.log("username: " + $scope.username + " password: " + $scope.password);
		console.log($scope.passwordEncrypted.toString());

		var jsonLogin = {
			"username" : $scope.username,
			"password" : $scope.passwordEncrypted.toString()
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

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				$scope.startPoint = data.geonames[0].toponymName;
				document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
			}, function(error) {
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

app.controller('registerCtrl', function($http, $scope, $ionicPopup, makeRequest) {


	//Fields variables
	$scope.name = "";
	$scope.lastName = "";
	$scope.username = "";
	$scope.password = "";
	$scope.confirmPassword = "";
	$scope.email = "";
	$scope.phone = "";
	$scope.idNumber = "";
	$scope.birthdate = "";


	//Accept Variables
	$scope.valName = "neutral-icon";
	$scope.valLastname = "neutral-icon";
	$scope.valUsername = "neutral-icon";
	$scope.valPassword = "neutral-icon";
	$scope.valConfirmPassword = "neutral-icon";
	$scope.valEmail = "neutral-icon";
	$scope.valPhone = "neutral-icon";
	$scope.valIdNumber = "neutral-icon";
	$scope.valBirthDate = "neutral-icon";


	var messages = ["As passwords não correspondem", "A password tem que ter no mínimo 8 caracteres",
					"Nome próprio só pode conter letras", "Apelido só pode conter letras", 
					"Nome de utilizador já em utilização", "Email com formato errado", 
					"O número de tel/tlm tem que ter 9 digitos", "O número de BI ou CC tem que ter 8 digitos", 
					"O formato da data é mm/dd/aaaa", "Por favor preencha todos os campos"];

	var messagesToDisplay = [0, 0, 0, 0, 0, 0, 0, 0];


	//This array respects the order of the template
	var emptyField = [1, 1, 1, 1, 1, 1, 1, 1, 1];

	function checkIfDifferente(arg1, arg2) {
		if(arg1 === arg2)
			return false;
		return true;
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Informação errada',
	     template: message
	   });
	 }

	$scope.validateNamesCallback = function(type) {

		var pattern = /^[A-Za-z]+$/;
	
		if(type === 'firstName') {
			if($scope.name.length === 0) {
				$scope.valName = "neutral-icon";
				messagesToDisplay[2] = 0;
				emptyField[0] = 1;
			}
			else {
				if($scope.name.match(pattern)) {
					$scope.valName = "green-icon";
					messagesToDisplay[2] = 0;
					emptyField[0] = 0;
				}
				else {
					$scope.valName = "red-icon";
					messagesToDisplay[2] = 1;
					emptyField[0] = 0;
				}
			}
		} 
		else if(type === 'lastName') {
			if($scope.lastName.length === 0) {
				$scope.valLastname = "neutral-icon";
				messagesToDisplay[3] = 0;
				emptyField[1] = 1;
			}
			else {
				if($scope.lastName.match(pattern)) {
					$scope.valLastname = "green-icon";
					messagesToDisplay[3] = 0;
					emptyField[1] = 0;
				}
				else {
					$scope.valLastname = "red-icon";
					messagesToDisplay[3] = 1;
					emptyField[1] = 0;
				}
			}
		}
	}

	$scope.usernameCallback = function() {
		if($scope.username.length === 0)
			emptyField[2] = 1;
		else emptyField[2] = 0;
	}

	$scope.passwordCallback = function() {
		if($scope.password.length === 0)
			emptyField[3] = 1;
		else {
			emptyField[3] = 0;
			if($scope.password.length >= 8)
				$scope.valPassword = "green-icon";
			else
				$scope.valPassword = "red-icon";
		}
	}


	$scope.confirmPasswordCallback = function() {
		if($scope.confirmPassword.length === 0) { 
			$scope.valConfirmPassword = "neutral-icon";
			messagesToDisplay[0] = 0;
			messagesToDisplay[1] = 0;
			emptyField[4] = 1;
		} else if($scope.password.length <8 || $scope.confirmPassword.length <8) {
			$scope.valConfirmPassword = "red-icon";
			messagesToDisplay[1] = 1;
			emptyField[4] = 0;
		}
		else if($scope.password === $scope.confirmPassword) {
			$scope.valConfirmPassword = "green-icon";
			messagesToDisplay[0] = 0;
			messagesToDisplay[1] = 0;
			emptyField[4] = 0;
			//encrypying password with sha-256
			$scope.passwordEncrypted = CryptoJS.SHA256($scope.password);
			console.log($scope.passwordEncrypted.toString());
		} else {
			$scope.valConfirmPassword = "red-icon";
			messagesToDisplay[0] = 1;
			messagesToDisplay[9] = 0;
			emptyField[4] = 0;
		}
	}

	$scope.validateEmailCallback = function() {

		var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if($scope.email.length === 0) {
			$scope.valEmail = "neutral-icon";
			messagesToDisplay[5] = 0;
			emptyField[5] = 1;
		}
		else if($scope.email.match(pattern)) {
			$scope.valEmail = "green-icon";
			messagesToDisplay[5] = 0;
			emptyField[5] = 0;
		}
		else {
			$scope.valEmail = "red-icon";
			messagesToDisplay[5] = 1;
			emptyField[5] = 0;
		}
	}

	$scope.validateNumbersCallback = function(type) {

		var patternPhone = /^\d{9}$/;
		var patternId = /^\d{8}$/;

		if(type === 'phone') {
			if($scope.phone.length === 0) {
				$scope.valPhone = "neutral-icon";
				messagesToDisplay[6] = 0;
				emptyField[6] = 1;
			}
			else if($scope.phone.match(patternPhone)) {
				$scope.valPhone = "green-icon";
				messagesToDisplay[6] = 0;
				emptyField[6] = 0;
			}
			else {
				$scope.valPhone = "red-icon";
				messagesToDisplay[6] = 1;
				emptyField[6] = 0;
			}
		}
		else if(type === 'identification') {
			if($scope.idNumber.length === 0) {
				$scope.valIdNumber = "neutral-icon";
				messagesToDisplay[7] = 0;
				emptyField[7] = 1;
			}
			else if($scope.idNumber.match(patternId)) {
				$scope.valIdNumber = "green-icon";
				messagesToDisplay[7] = 0;
				emptyField[7] = 0;
			}
			else { 
				$scope.valIdNumber = "red-icon";
				messagesToDisplay[7] = 1;
				emptyField[7] = 0;
			}
		}
	}

	$scope.validateDateCallback = function() {

		var pattern = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;

		if($scope.birthdate.length === 0){
			$scope.valBirthDate = "neutral-icon";
			messagesToDisplay[8] = 0;
			emptyField[8] = 1;
		}
		else if($scope.birthdate.match(pattern)) {
			$scope.valBirthDate = "green-icon";
			messagesToDisplay[8] = 0;
			emptyField[8] = 0;
		}
		else {
			$scope.valBirthDate = "red-icon";
			messagesToDisplay[8] = 1;
			emptyField[8] = 0;
		}
	}

	$scope.submitRegister = function() {
		console.log("name: " + $scope.name + " lastName: " + $scope.lastName + " username: " + $scope.username); 

		var jsonRegister = {
			"firstName" : $scope.name,
			"secondName" : $scope.lastName,
			"username" : $scope.username,
			"password" : $scope.passwordEncrypted.toString(),
			"email" : $scope.email,
			"birthDate" : $scope.birthdate,
			"citizenCard" : $scope.idNumber,
			"reputation" : "0",
			"phoneNumber" : $scope.phone
		};

		var isEmpty = false;
		var isValid = true;

		for (var i = 0; i < emptyField.length; i++) {
			if(emptyField[i] === 1) {
				showAlert(messages[9]);
				isEmpty = true;
				break;
			}
		};

		if(!isEmpty) {
			for (var i = 0; i < messagesToDisplay.length; i++) {
				if(messagesToDisplay[i] === 1) {
					showAlert(messages[i]);
					isValid = false;
					break;
				}
			};
		}
		
		if(isValid && !isEmpty) {
			var json = JSON.stringify(jsonRegister);

			var response = makeRequest.register(json);

			console.log(response);
			
		}
	}

});





