var module = angular.module('profileModule');

module.controller('profileCtrl', function($scope, $ionicPopup, makeRequest, BACache) {

	$scope.profileInfo;
	$scope.checkedPasswords = false;

	$scope.data = {};
	$scope.oldPassword;
	$scope.newPassword;

	$scope.loadProfile = function() {

		var json = makeRequest.getUserJson();
		if(typeof json === 'undefined') {
			var currentHash = BACache.get('session');
			var username = makeRequest.getUserName();

			console.log(currentHash);
			if(typeof currentHash !== 'undefined') {
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
			$scope.profileInfo = json.data;
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

        	// compute the hash with username and olc encoded password
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

        	makeRequest.sendPassword(username_password, jsonPassword).
			// then is called when service comes with an answer
				then(function(data) {
					showPasswordAlert("<div style='text-align: center'>Password alterada com sucesso.</div>");
					console.log('password alterada');
				}, function(error) {
					showPasswordAlert("<div style='text-align: center'>Erro na alteração da password.</div>");
			});
        	
        }
      },
    ]
  });
 };


  function showPasswordAlert(message) {
   var alertPopup = $ionicPopup.alert({
     title: 'Password',
     template: message
   });
 };
});