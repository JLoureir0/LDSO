var module = angular.module('tripsModule');

module.controller('searchTripCtrl', function($scope, $http, $ionicPopup, $state, makeRequest, BACache) {

	$scope.getExistingTrips = function() {
		//call service
		makeRequest.getTrips().
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);

				$scope.trips = [];
				for(var i = 0; i < data.data.length; i++) {
					var trip = [];
					trip.startPoint = data.data[i].starting_point;
					trip.destPoint = data.data[i].destination;
					trip.username = data.data[i].username;

					if(data.data[i].vehicle === '0') {
						trip.vehicle = 'Viatura de passageiros';
					} else if(data.data[i].vehicle === '1') {
						trip.vehicle = 'Viatura de mercadorias';
					}

					// HARDCODED ////////////////////////
					trip.weekDay = 'Qua.';
					trip.monthDay = '20';
					trip.month = 'Set';
					trip.year = '2015';
					trip.startTime = {hour: '19', minute: '30'};
					trip.scheduleEndTime = {hour: '22', minute: '30'};
					trip.contact = "918649442";
					////////////////////////////////////

					var objectTypes = [];
					if(data.data[i].fragile === 'true') {
						objectTypes.push('frágil');
					}
					if(data.data[i].flamable === 'true') {
						objectTypes.push('inflamável');	
					}
					if(data.data[i].big_dimensions === 'true') {
						objectTypes.push('grandes dimensões');
					}

					trip.objectTypes = objectTypes;
					trip.minPrice = data.data[i].min_price;
					trip.maxDesv = data.data[i].max_deviation;
					trip.id = data.data[i]._id;
					
					$scope.trips.push(trip);
				}

			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});
	}

	$scope.setCurrentTrip = function(index) {
		if(BACache.info().size === 0) {
			showAlert('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {
			for(var i = 0; i < $scope.trips.length; i++) {
				if($scope.trips[i].id === index) {
					console.log($scope.trips[i]);
					$scope.trip.startPoint = $scope.trips[i].startPoint;
					$scope.trip.destPoint = $scope.trips[i].destPoint;
					$scope.trip.weekDay = $scope.trips[i].weekDay;
					$scope.trip.monthDay = $scope.trips[i].monthDay;
					$scope.trip.month = $scope.trips[i].month;
					$scope.trip.year = $scope.trips[i].year;
					$scope.trip.startTime = $scope.trips[i].startTime;
					$scope.trip.scheduleEndTime = $scope.trips[i].scheduleEndTime;
					$scope.trip.objectTypes = $scope.trips[i].objectTypes;
					$scope.trip.minPrice = $scope.trips[i].minPrice;
					$scope.trip.maxDesv = $scope.trips[i].maxDesv;
					$scope.trip.username = $scope.trips[i].username;
					$scope.trip.vehicle = $scope.trips[i].vehicle;
					$scope.trip.contact = $scope.trips[i].contact; 
					$scope.trip.id = $scope.trips[i].id;
					break;
				}
			}
			console.log($scope.trip);
			$state.go('menu.trip');
		}
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

	$scope.startPoint = "";

	$scope.getCurrentLocation = function() {
		document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
		setTimeout(function () { navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true, maximumAge:Infinity, timeout:30000}); }, 0);
	}

	function resetSpinner() {
		document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
	}

	function onSuccess(position) {
		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				document.getElementById("start-location-field").value = data.geonames[0].toponymName;
				setTimeout(resetSpinner(), 0);
			}, function(error) {
				setTimeout(resetSpinner(), 0);
				showAlert('O sistema não conseguiu receber as informações do GPS');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			showAlert('Permissão negada');
			break;
		case 2:
			showAlert('Posição indisponível');
			break;
		case 3:
			showAlert('Tempo de ligação expirado');
			break;
		default:
			showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
	}
});

module.controller('shareTripCtrl', function($scope, $http, $ionicPopup, $state, makeRequest, BACache) {

	$scope.startPoint = "";
	$scope.destination = "";
	$scope.isFragile = false;
	$scope.isFlamable = false;
	$scope.isLarge = false;
	$scope.minPrice = "";
	$scope.maxDeviation = "";

	$scope.getCurrentLocation = function() {
		document.getElementById("search-position-icon").className = "fa fa-spinner fa-spin fa-2x";
		setTimeout(function () { navigator.geolocation.getCurrentPosition(onSuccess, onError, {enableHighAccuracy:true, maximumAge:Infinity, timeout:30000}); }, 0);
	}

	function resetSpinner() {
		document.getElementById("search-position-icon").className = "fa fa-map-marker fa-2x";
	}

	function onSuccess(position) {
		var latitude = "";
		var longitude = "";

		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		makeRequest.getLocation(latitude, longitude).
			// then is called when service comes with an answer
			then(function(data){
				document.getElementById("start-location-field").value = data.geonames[0].toponymName; 
				setTimeout(resetSpinner(), 0);
			}, function(error) {
				setTimeout(resetSpinner(), 0);
				showAlert('O sistema não conseguiu receber as informações do GPS');
			});
	}  

	function onError(error) {
		switch(error.code) {
		case 1:
			showAlert('Permissão negada');
			break;
		case 2:
			showAlert('Posição indisponível');
			break;
		case 3:
			showAlert('Tempo de ligação expirado');
			break;
		default:
			showAlert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
			break;
		}
		setTimeout(resetSpinner, 0);
	}

	$scope.shareTripSubmit = function() {

		if(BACache.info().size === 0) {
			showAlert('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {

			var username = makeRequest.getUserName();
			var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
			var username_password = "Basic " + btoa(username + ':' + userEncryptedPassword);

			var vehicleCode = -1;
			var vehicleType = document.getElementById("selectVehicle");
			var vehicle = vehicleType.options[vehicleType.selectedIndex].value;

			if(vehicle === "Viatura de passageiros") {
				vehicleCode = 0;
			} else if(vehicle === "Viatura de mercadorias") {
				vehicleCode = 1;
			}

			vehicleCode = vehicleCode.toString(); 
			$scope.isFragile = $scope.isFragile.toString();
			$scope.isFlamable = $scope.isFlamable.toString();
			$scope.isLarge = $scope.isLarge.toString();
			$scope.startPoint = document.getElementById("start-location-field").value;

			var jsonShareTrip = {
				"starting_point" : $scope.startPoint,
				"destination" : $scope.destination,
				"fragile" : $scope.isFragile,
				"flamable" : $scope.isFlamable,
				"big_dimensions" : $scope.isLarge,
				"vehicle" : vehicleCode,
				"min_price" : $scope.minPrice,
				"max_deviation" : $scope.maxDeviation
			};
			var json = JSON.stringify(jsonShareTrip);

			//call service
			makeRequest.sendTrip(json, username_password).
				// then is called when service comes with an answer
				then(function(data){
					console.log(data);
				}, function(error) {
					alert("Erro: " + "Resposta do servidor não recebida");
				});

			}
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

});