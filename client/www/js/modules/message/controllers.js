var module = angular.module('messageModule');

module.controller('messageCtrl', function($scope, $ionicPopup, $state, makeRequest, BACache) {

	$scope.updateEditor = function(keyCode) {

		alert(keyCode);
		if(keyCode == 8 || keyCode == 67) {
			var element = document.getElementById("message-body");
	    	element.style.height = element.scrollHeight - 6 + "px";
		} else if(keyCode == 13){
			var element = document.getElementById("message-body");
	    	element.style.height = element.scrollHeight + 6 + "px";
		}
	};

	$scope.destination = "";

	$scope.setDestination = function() {
		if(makeRequest.getMessageUser())
			$scope.destination = makeRequest.getMessageUser();

		makeRequest.resetMessageUser();

	};
});