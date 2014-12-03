var module = angular.module('starter');

module.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('welcome', {
		url: "/welcome",
		views: {
			'applicationContent' :{
				controller: "SlideController",
				templateUrl: "templates/welcome.html"
			}
		}
	})
	.state('menu', {
		url: "/menu",
		abstract: true,
		views: {
			'applicationContent' :{
				templateUrl: "templates/menu.html",
				controller: "toogleCtrl"
			}
		}
	})
	.state('menu.registo', {
		url: "/registo",
		views: {
			'menuContent' :{
				templateUrl: "templates/registo.html",
				controller: "registerCtrl"
			}
		}
	})
	.state('menu.login', {
		url: "/login",
		views: {
			'menuContent' :{
				templateUrl: "templates/login.html",
				controller: "loginCtrl"
			}
		}
	}).state('menu.share-trip', {
		url: "/share-trip",
		views: {
			'menuContent' :{
				templateUrl: "templates/share-trip.html",
				controller: "shareTripCtrl"
			}
		}
	}).state('menu.my-trips', {
		url: "/my-trips",
		views: {
			'menuContent' :{
				templateUrl: "templates/my-trips.html"
			}
		}
	}).state('menu.search-trip', {
		url: "/search-trip",
		views: {
			'menuContent' :{
				templateUrl: "templates/search-trip.html",
				controller: "searchTripCtrl"
			}
		}
	}).state('menu.messages', {
		url: '/messages',
		views: {
			'menuContent' :{
				templateUrl: "templates/messages.html"
			}
		}
	}).state('menu.message', {
		url: '/message',
		views: {
			'menuContent' :{
				templateUrl: "templates/message.html"
			}
		}
	}).state('menu.profile', {
		url: '/profile',
		views: {
			'menuContent' :{
				templateUrl: "templates/profile.html",
				controller: "loginCtrl"
			}
		}
	}).state('menu.my-trip', {
		url: "/my-trip",
		views: {
			'menuContent' :{
				templateUrl: "templates/my-trip.html"
			}
		}
	}).state('menu.trip', {
		url: "/trip",
		views: {
			'menuContent' :{
				templateUrl: "templates/trip.html"
			}
		}
	});

    //Default startup screen
    if(window.localStorage.getItem('has_run') == null) {
    	window.localStorage.setItem('has_run', 'true');
    	$urlRouterProvider.otherwise("/welcome");
    } else {
    	$urlRouterProvider.otherwise("/menu/login");  
    }

});