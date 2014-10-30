var module = angular.module('registerModule');

module.controller('registerCtrl', function($http, $scope, $ionicPopup, makeRequest) {

	//Fields variables
	$scope.name = "";
	$scope.lastName = "";
	$scope.username = "";
	$scope.password = "";
	$scope.confirmPassword = "";
	$scope.passwordEncrypted = "";
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

		var pattern = /^\d{4}[\/](0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])$/;

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
