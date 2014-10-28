var module = angular.module('welcomeModule');

module.controller('SlideController', function($scope, $state){
  // When the last slide goes right the app opens
  $scope.onSwipeRight = function() {
  	$state.go('menu.login');
  }

});