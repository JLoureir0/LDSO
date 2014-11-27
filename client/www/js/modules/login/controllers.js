var module = angular.module('loginModule');

module.controller('loginCtrl', function($scope, makeRequest) {

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

		// to change password to passwordEncrypted
		var username_password = "Basic " + btoa($scope.username + ':' + $scope.password);

		var received = makeRequest.sendLogin(username_password);

		console.log(received);
	}

});