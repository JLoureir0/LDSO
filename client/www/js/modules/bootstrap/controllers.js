var module = angular.module('starter');

module.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate, $state, BACache, makeRequest) {

	$scope.username;
	$scope.items;
	$scope.trip = new Array();
	$scope.trips = [];
	$scope.showRegisterFooter = false;
	$scope.showLoginFooter = false;

	$scope.toggleLeft = function() {
		$ionicSideMenuDelegate.toggleLeft();
	}

	$scope.selectItem = function($index) {

		var currentHash = BACache.get('session');
		if(currentHash) {
			switch($index) {
				case 0:
					$state.go('menu.my-trips');
					break;
				case 1:
					$state.go('menu.search-trip');
					break;
				case 2:
					$state.go('menu.share-trip');
					break;
				case 3:
					$state.go('menu.messages');
					break;
				case 4:
					$state.go('menu.login');
					logOut();
					break;
				case 5:
					showDialog();
					break;
				default:
					break;
			}
		} else {
				switch($index) {
				case 0:
					$state.go('menu.search-trip');
					break;
				case 1:
					showDialog();
					break;
				default:
					break;
			}
		}
	}

	$scope.updateFootersAndSidebar = function() {

		// deal with footers
		if($state.current.url === '/login')
			$scope.showRegisterFooter = true;
		else
			$scope.showRegisterFooter = false;

		if($state.current.url === '/registo')
			$scope.showLoginFooter = true;
		else 
			$scope.showLoginFooter = false;

		// deal with side menu
	    var alreadySetUsername = makeRequest.getUserName();
		if(typeof alreadySetUsername !== 'undefined') {
			$scope.username = alreadySetUsername;
		}
		else {
			$scope.username = "";
		}

		var userhash = BACache.get('session');
		if(typeof username !== 'undefined') {
			document.getElementById("menu_username").style.display = 'inline';
			$scope.items = [
				{item: 'Minhas viagens'},
				{item: 'Procurar viagens'},
				{item: 'Partilhar viagem'},
				{item: 'Mensagens'},
				{item: 'Terminar sessão'},
				{item: 'Sair'}
			];
		} else {
			document.getElementById("menu_username").style.display = 'none';
			$scope.items = [
				{item: 'Procurar viagens'},
				{item: 'Sair'}
			];
		}
	}

	$scope.checkIfLoggedIn = function() {
		if(BACache.get('session') != null)
			$state.go('menu.profile');
	}

	function logOut() {
		BACache.removeAll();
		makeRequest.resetUserVariables();
		$scope.updateFootersAndSidebar();
		$state.go('login');
	}


/*********Close the application***********/

  //Function that will show popup asking if user wants to exit application or not
  function showDialog() {
  	navigator.notification.confirm("Deseja sair da aplicação?", exitApplication, "Sair", "Não, Sim");
  }

  // If the user clicks yes the application will close
  function exitApplication(buttonIndex) {
  	if(buttonIndex == 1) {
  		navigator.app.exitApp();
  	}
  }

/****************************************/

});

