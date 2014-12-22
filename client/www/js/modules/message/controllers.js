var module = angular.module('messageModule');

module.controller('messageCtrl', function($scope, $ionicPopup, $state, makeRequest, BACache) {

	$scope.updateEditor = function() {
	    var element = document.getElementById("message-body");
	    console.log(element.style.height);
	    element.style.height = element.scrollHeight + "px";
	};
});