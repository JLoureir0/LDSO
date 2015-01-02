var module = angular.module('tripsModule');

module.controller('searchTripCtrl', function($scope, $http, $ionicPopup, $state, $ionicLoading, makeRequest, BACache) {

	$scope.getExistingTrips = function() {

		$scope.show();

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
					//var date = new Date(year, month, day);
					trip.weekDay = 'Qua.';
					trip.monthDay = '20';
					trip.month = 'Set';
					trip.year = '2015'
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
				$scope.hide();
			}, function(error) {
				$scope.hide();
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

	$scope.show = function() {
	    $ionicLoading.show({
	      template: 'Aguarde...'
	    });
 	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

});

module.controller('myTripsCtrl', function($scope, $http, $ionicPopup, $ionicLoading, $state, makeRequest, BACache) {

	$scope.getMyTrips = function() {
		if(BACache.info().size === 0) {
			showAlert('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {

			$scope.show();

			var username = makeRequest.getUserName();

			makeRequest.getTrips().
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);

				$scope.trips = [];
				for(var i = 0; i < data.data.length; i++) {
					if(data.data[i].username === username) {
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
				}
				$scope.hide();
			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});
		}
	}

	$scope.isMyTrip = function(username) {
		return (makeRequest.getUserName() === username);
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
			$state.go('menu.trip');
		}
	}

	$scope.loadUserProfile = function(username) {
		makeRequest.setProfileToOpen(username);
		$state.go('menu.profile');
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

	 $scope.show = function() {
	    $ionicLoading.show({
	      template: 'Aguarde...'
	    });
 	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};
});

module.controller('shareTripCtrl', function($scope, $http, $ionicPopup, $state, makeRequest, BACache) {

	$scope.startPoint = "";
	$scope.destination = "";
	$scope.isFragile = false;
	$scope.isFlamable = false;
	$scope.isLarge = false;
	$scope.minPrice = "";
	$scope.maxDeviation = "";
	$scope.tripDate = "";
	$scope.tripStartTime = "";
	$scope.tripEndTime = "";

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

			// new stuff to send
			/*
			var weekDay = getWeekDay($scope.tripDate);
			var monthDay = $scope.tripDate.split('-')[2];
			var month = getMonth($scope.tripDate);
			var year = $scope.tripDate.split('-')[0];
			var startTime = {hour: $scope.tripStartTime.split(':')[0], minute: $scope.tripStartTime.split(':')[1]};
			var scheduleEndTime = {hour: $scope.tripEndTime.split(':')[0], minute: $scope.tripEndTime.split(':')[1]};
			var contact = "918649442";

			console.log(weekDay);
			console.log(monthDay);
			console.log(month);
			console.log(year);
			console.log(startTime);
			console.log(scheduleEndTime);
			*/

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
					$state.go('menu.my-trips');
				}, function(error) {
					alert("Erro: " + "Resposta do servidor não recebida");
				});

			}
	}

	// return a literal day of week
	function getWeekDay(date) {
		
		// 2015-01-08
		var year = parseInt(date.split('-')[0]);
		var month = parseInt(date.split('-')[1]);
		var day = parseInt(date.split('-')[2]);

		var numericWeekDay = new Date(year, month-1, day-1).getDay();
		var literalWeekDay = '';

		switch(numericWeekDay){
			case 0:
				literalWeekDay = "Seg";
				break;
			case 1:
				literalWeekDay = "Ter";
				break;
			case 2:
				literalWeekDay = "Qua";
				break;
			case 3:
				literalWeekDay = "Qui";
				break;
			case 4:
				literalWeekDay = "Sex";
				break;
			case 5:
				literalWeekDay = "Sab";
				break;
			case 6:
				literalWeekDay = "Dom";
				break;
			default:
				literalWeekDay = "Seg";
				break;
		}

		return literalWeekDay;
	}

	//returns literal month
	function getMonth(date) {
		
		// 2015-01-08
		var month = parseInt(date.split('-')[1]);

		var literalMonth= '';

		switch(month){
			case 1:
				literalMonth = "Jan";
				break;
			case 2:
				literalMonth = "Fev";
				break;
			case 3:
				literalMonth = "Mar";
				break;
			case 4:
				literalMonth = "Abr";
				break;
			case 5:
				literalMonth = "Mai";
				break;
			case 6:
				literalMonth = "Jun";
				break;
			case 7:
				literalMonth = "Jul";
				break;
			case 8:
				literalMonth = "Ago";
				break;
			case 9:
				literalMonth = "Set";
				break;
			case 10:
				literalMonth = "Out";
				break;
			case 11:
				literalMonth = "Nov";
				break;
			case 12:
				literalMonth = "Dez";
				break;
			default:
				literalMonth = "Jan";
				break;
		}

		return literalMonth;
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }
});