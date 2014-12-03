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

// Triggered on a button click, or some other target
$scope.changePassword = function() {

	$scope.data = {};
	$scope.oldPassword;
	$scope.newPassword;

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    template: 'Password Antiga: <input type="password" ng-model="data.oldPassword">Password Nova: <input type="password" ng-model="data.newPassword">Confirmar: <input type="password" ng-model="data.confirmPassword">',
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
					/*
					BACache.put('session', username_password);
					$scope.profileInfo = data['data'][0];
					console.log(JSON.stringify(data));
					console.log($scope.profileInfo.first_name);
					$state.go('menu.profile');
					*/

					// if the password inside user object is the same as the newPassword written by user
						// Compute new hash and Show alert that password has been changed
					// else show alert that password has not been changed

					
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
   alertPopup.then(function(res) {
     console.log('Thank you for not eating my delicious ice cream cone');
   });
 };
});