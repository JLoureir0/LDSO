var module = angular.module('loginModule');

module.controller('loginCtrl', function($scope, $ionicPopup, $state, makeRequest, BACache, $ionicLoading) {

	$scope.username = "";
	$scope.password = "";

	$scope.confirmPasswordCallback = function() {
		if($scope.password.length <8)
			console.log("Password must have at least 8 characters");
		else
			console.log("Valid password");
	}

	$scope.submitLogin = function() {

		// show loading
		show();
		
		$scope.passwordEncrypted = CryptoJS.SHA256($scope.password);

		var jsonLogin = {
			"username" : $scope.username,
			"password" : $scope.passwordEncrypted.toString()
		};
		var json = JSON.stringify(jsonLogin);

		var username_password = "Basic " + btoa($scope.username + ':' + $scope.passwordEncrypted);
		
		makeRequest.sendLogin(username_password, $scope.username).
			// login was done with sucess
			then(function(data) {
				BACache.put('session', username_password);
				makeRequest.setUserName($scope.username);
				$state.go('menu.profile');
			}, function(error) {
				showAlert('Por favor reintroduza as suas credenciais!');
		});


	}

	function show() {
	    $ionicLoading.show({
	      template: 'Aguarde...',
	      duration: 500
	    });
  	};
  
  	function hide(){
    	$ionicLoading.hide();
  	};

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Acesso negado',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }

});