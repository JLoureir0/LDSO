var module = angular.module('profileModule');

module.controller('profileCtrl', function($scope, $ionicPopup, $state, makeRequest, BACache) {

	$scope.profileInfo;
	$scope.checkedPasswords = false;
	$scope.checkedDescription = false;

	$scope.data = {};
	$scope.oldPassword;
	$scope.newPassword;

	$scope.newDescription = "";
	$scope.newContact = "";
	$scope.newHomeTown = "";
	$scope.newEmail = "";

	$scope.loadProfile = function() {
		if(BACache.info().size === 0) {
			showAlert('Não tem sessão iniciada');
			// change state
			$state.go('menu.login');
		} else {
			var username = makeRequest.getUserName();
			var usernameToOpen = makeRequest.getProfileToOpen();
			if(usernameToOpen === username) {
				loadUserInfo(username);
			} else {
				loadUserInfo(usernameToOpen);
			}
		}
	}

	function loadUserInfo(username) {
		var currentHash = BACache.get('session');
		if(currentHash) {
			makeRequest.getUser(currentHash, username).
			then(function(data) {
				$scope.profileInfo = data['data'];
			}, function(error) {
				showAlert('Acesso negado!');
			});
		} else {
			showAlert('Acesso negado!');
		}
	}

	// validates passwords before send them to server
	$scope.passwordCallback = function() {
		if($scope.data.newPassword < 8 || $scope.data.confirmPassword < 8 || ($scope.data.newPassword.trim() !== $scope.data.confirmPassword.trim()))
			$scope.checkedPasswords = false;
		else 
			$scope.checkedPasswords = true;
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Acesso negado',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

	function validateHometown() {
		var pattern = /^[\u00C0-\u00FFa-zA-Z]+(\s[\u00C0-\u00FFa-zA-Z]+)*$/;
		if($scope.newHomeTown.length === 0) {
			return false;
		} else {
			if($scope.newHomeTown.match(pattern)) {
				return true;
			} else {
				return false;
			}
		}
	}

	function validateEmail() {
		var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if($scope.newEmail.length === 0) {
			return false;
		}
		else if($scope.newEmail.match(pattern)) {
			return true;
		}
		else {
			return false;
		}
	}

	function validateContact() {
		var patternPhone = /^\d{9}$/;
		if($scope.newContact.length === 0) {
			return false;
		}
		else if($scope.newContact.match(patternPhone)) {
			return true;
		}
		else {
			return false;
		}
	}

	function checkIfChangesAreValid() {
	 	var isHometownValid = false;
	 	var isContactValid = false;
	 	var isEmailValid = false;
	 	var allNull = true;

	 	if($scope.newHomeTown == null || $scope.newHomeTown == undefined) {
	 		isHometownValid = true;
	 	} else if($scope.newHomeTown.length > 0) {
	 		if(validateHometown() == true) {
	 			isHometownValid = true;
	 			allNull = false;
	 		} else {
	 			isHometownValid = false;
	 			return "hometownNotValid";
	 		}
	 	} else {
	 		isHometownValid = true;
	 	}

	 	if($scope.newContact == null || $scope.newContact == undefined) {
	 		isContactValid = true;
	 	} else if($scope.newContact.length > 0) {
	 		if(validateContact() == true) {
	 			isContactValid = true;
	 			allNull = false;
	 		} else {
	 			isContactValid = false;
	 			return "contactNotValid";
	 		}
	 	} else {
	 		isContactValid = true;
	 	}

	 	if($scope.newEmail == null || $scope.newEmail == undefined) {
	 		isEmailValid = true;
	 	} else if($scope.newEmail.length > 0) {
	 		if(validateEmail() == true) {
	 			isEmailValid = true;
	 			allNull = false;
	 		} else {
	 			isEmailValid = false;
	 			return "emailNotValid";
	 		}
	 	} else {
	 		isEmailValid = true;
	 	}

	 	if(allNull == true) {
	 		return "allNull";
	 	}
	 	else if(isHometownValid == true && isContactValid == true && isEmailValid == true) {
	 		return true;
	 	} else {
	 		return false;
	 	}
	}

	 // Triggered on a button click, or some other target
	$scope.changeProfileInfo = function() {

	  // An elaborate, custom popup
	  var myPopup = $ionicPopup.show({
	    template: 'Nova localidade: <input type="text" ng-model="data.newHomeTown">' +
	    'Novo contacto: <input type="text" ng-model="data.newContact">' +
	    'Novo email: <input type="text" ng-model="data.newEmail">',
	    title: 'Alterar dados',
	    scope: $scope,
	    buttons: [
	      { text: 'Cancelar' },
	      {
	        text: '<b>Alterar</b>',
	        type: 'button-positive',
	        onTap: function(e) {

	        	$scope.newHomeTown = $scope.data.newHomeTown;
	        	$scope.newContact = $scope.data.newContact;
	        	$scope.newEmail = $scope.data.newEmail;

	        	var result = checkIfChangesAreValid();

	        	if(result == true) {
	        		//checkIfValid
	        		//make request
	        		console.log("profile changed");
	        		console.log("new hometown: " + $scope.newHomeTown);
	        		console.log("new contact: " + $scope.newContact);
	        		console.log("new email: " + $scope.newEmail);
	        	} else if(result === "allNull") {
	        		showAlert("Edit", "Deve preencher no minimo um campo");
	        	} else if(result === "emailNotValid") {
	        		showAlert("Edit", "O email não é valido");
	        	} else if(result === "contactNotValid") {
	        		showAlert("Edit", "O contacto não é valido");
	        	} else if(result === "hometownNotValid") {
	        		showAlert("Edit", "A locadidade não é valida");
	        	}
	        }
	      },
	    ]
	  });
	 };

	 function checkIfNewDescriptionIsValid() {
	 	if($scope.newDescription == null || $scope.newDescription == undefined) {
	 		return false;
	 	} else if($scope.newDescription.length > 0) {
	 		return true;
	 	} else {
	 		return false;
	 	}
	 }

	// Triggered on a button click, or some other target
	$scope.changeDescription = function() {

	  // An elaborate, custom popup
	  var myPopup = $ionicPopup.show({
	    template: 'Nova descrição: <textarea rows="4" cols="50" type="text" ng-model="data.newDescription">',
	    title: 'Alterar password',
	    scope: $scope,
	    buttons: [
	      { text: 'Cancelar' },
	      {
	        text: '<b>Alterar</b>',
	        type: 'button-positive',
	        onTap: function(e) {

	        	$scope.newDescription = $scope.data.newDescription;

	        	if(checkIfNewDescriptionIsValid() == false) {
					showAlert("Descrição", "A descrição não deve ser nula");
	        	} else {   		
		        	//make request
		        	console.log("changed description");
		        	console.log("mew description: " + $scope.newDescription);
	        	}
	        }
	      },
	    ]
	  });
	 };

	// Triggered on a button click, or some other target
	$scope.changePassword = function() {

	  // An elaborate, custom popup
	  var myPopup = $ionicPopup.show({
	    template: 'Password Antiga: <input type="password" ng-model="data.oldPassword">' +
	    'Password Nova: <input type="password" ng-model="data.newPassword">' +
	    'Confirmar: <input type="password" ng-model="data.confirmPassword" ng-change = "passwordCallback()">' +
	    '<div class="icon-validate"><i ng-if="checkedPasswords" class="ion-checkmark-round"></i></div>',
	    title: 'Alterar password',
	    scope: $scope,
	    buttons: [
	      { text: 'Cancelar' },
	      {
	        text: '<b>Alterar</b>',
	        type: 'button-positive',
	        onTap: function(e) {

	        	// compute the hash with username and old encoded password
	        	$scope.oldPassword = $scope.data.oldPassword;
	        	$scope.newPassword = $scope.data.newPassword;
	        	var confirmPassword = $scope.data.confirmPassword;

	        	var username = makeRequest.getUserName();

	        	var oldEncoded = CryptoJS.SHA256($scope.oldPassword);
	        	var newEncoded = CryptoJS.SHA256($scope.newPassword);
	        	
	        	var username_password = "Basic " + btoa(username + ':' + oldEncoded);

	        	var jsonPassword = {
					"password" : newEncoded.toString()
				};

	        	makeRequest.sendPassword(username, username_password, jsonPassword).
				// then is called when service comes with an answer
					then(function(data) {
						showAlert("Password", "<div style='text-align: center'>Password alterada com sucesso.</div>");
						console.log('password alterada');
					}, function(error) {
						showPasswordAlert("Password", "<div style='text-align: center'>Erro na alteração da password.</div>");
				});
	        	
	        }
	      },
	    ]
	  });
	 };


  function showAlert(title, message) {
   var alertPopup = $ionicPopup.alert({
     title: title,
     template: message
   });
 };

});