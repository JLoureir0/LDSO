var module = angular.module('starter');

module.controller('toogleCtrl', function($scope, $ionicSideMenuDelegate, $state, BACache, makeRequest) {

	$scope.username;
	$scope.items;

	/*Temporary trip*/
	$scope.trip = {
		startPoint: 'Paranhos',
		destPoint: 'Lisboa',
		weekDay: 'Qui.',
		monthDay: '21',
		month: 'Set',
		startTime: {hour: '9', minute: '30'},
		scheduleEndTime: {hour: '15', minute: '15'},
		objectTypes: ['grandes dimensões', 'inflamável', 'frágil'],
		minPrice: '4',
		maxDesv: '10'
	};

	/*Temporary trips*/
	$scope.trips = [
		{startPoint: 'Paranhos',
		destPoint: 'Lisboa',
		weekDay: 'Qua.',
		monthDay: '20',
		month: 'Set',
		startTime: {hour: '19', minute: '30'},
		scheduleEndTime: {hour: '23', minute: '15'},
		objectTypes: ['frágil', 'inflamável'],
		minPrice: '5',
		maxDesv: '20'
	}
];

$scope.showRegisterFooter = false;
$scope.showLoginFooter = false;

$scope.toggleLeft = function() {
	$ionicSideMenuDelegate.toggleLeft();
}

$scope.selectItem = function($index) {
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
			showDialog();
			break;
		default:
			break;
	} 
}

$scope.updateFootersAndSidebar = function() {

	if($state.current.url === '/login')
		$scope.showRegisterFooter = true;
	else
		$scope.showRegisterFooter = false;

	if($state.current.url === '/registo')
		$scope.showLoginFooter = true;
	else 
		$scope.showLoginFooter = false;

    var alreadySetUrsername = makeRequest.getUserName();
	if(typeof alreadySetUrsername !== 'undefined') {
		$scope.username = alreadySetUrsername;
	}
	else {
		$scope.username = "";
	}

	var userhash = BACache.get('session');
	if(typeof username !== 'undefined') {
		$scope.items = [
			{item: 'As tuas viagens'},
			{item: 'Procurar viagens'},
			{item: 'Partilhar viagem'},
			{item: 'Mensagens'},
			{item: 'Sair'}
		];
	} else {
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


/*********Close the application***********/

  //Function that will show popup asking if user wants to exit application or not
  function showDialog() {
  	navigator.notification.beep(1);
  	navigator.notification.confirm("Deseja sair da aplicação?", exitApplication, "Sair", "Sim, Não");
  }

  // If the user clicks yes the application will close
  function exitApplication(buttonIndex) {
  	if(buttonIndex == 1) {
  		navigator.app.exitApp();
  	}
  }

/****************************************/

});

