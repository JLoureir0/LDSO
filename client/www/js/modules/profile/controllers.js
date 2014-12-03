var module = angular.module('profileModule');

module.controller('profileCtrl', function($scope, $ionicPopup, makeRequest, BACache) {

// Triggered on a button click, or some other target
$scope.changePassword = function() {

	$scope.data = {};

  // An elaborate, custom popup
  var myPopup = $ionicPopup.show({
    templateUrl: '../templates/change-password.html',
    title: 'Alterar password',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
        	/*
             console.log($scope.data.oldPassword);
             console.log($scope.data.newPassword);
             console.log($scope.data.confirmPassword);
             */
        }
      },
    ]
  });
 };



});