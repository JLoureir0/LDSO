var module = angular.module('profileModule');

module.controller('profileCtrl', function($scope, $ionicPopup, makeRequest, BACache) {

	$scope.profileInfo;

	$scope.loadProfile = function() {

		var json = makeRequest.getUserJson();
		if(typeof json === 'undefined') {
			var currentHash = BACache.get('session');
			var username = makeRequest.getUserName();
			
			if(typeof username !== 'undefined') {
				makeRequest.getUser(currentHash, username).
				then(function(data) {
					$scope.profileInfo = data['data'];
				}, function(error) {
					showAlert('Acesso negado');
				});
			} else {
				showAlert('Acesso negado, no hash in cache');
			}
		} else {
			$scope.profileInfo = json;
		}
	}

	// An alert dialog
	function showAlert(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Acesso negado',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	 }
});