var module = angular.module('starter');
var timeout = 5000;
var ip = "localhost";
var username;
var userJson;
/*
* Singleton that will provide a singleton to make a server request
*/
module.factory('makeRequest', function ($http, $q) {
	return {
		sendTrip: function(json) {
            return $http.post('http://' + ip + ':3000/trip.json', json, {timeout: timeout})
            .then(function(response) {
            	if (typeof response.data === 'object') {
            		return response.data;
            	} else {
                    // invalid response
                    return $q.reject(response.data);
                }
            }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                }
            );
        },

        getTrips: function() {
            return $http.get('http://' + ip + ':3000/trip.json', {timeout: timeout})
            .then(function(response) {
            	if (typeof response.data === 'object') {
            		return response.data;
            	} else {
                    // invalid response
                    return $q.reject(response.data);
                }
           	}, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                }
            );
        },

        register: function(json) {
        	return $http.post('http://' + ip + ':3000/users.json', json, {timeout: timeout})
        	.then(function(response){
        		if(typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
        			return $q.reject(response.data);
        		}
        	}, function(response) {
        			// something went wrong
        			return $q.reject(response.data);
        		}
        	);
        },

        getLocation: function(latitude, longitude) {
        	return $http.get("http://api.geonames.org/findNearbyJSON?lat=" + latitude + "&lng=" + longitude + "&username=ldso_14", {timeout: timeout})
        	.then(function(response){
        		if(typeof response.data === 'object') {
        			return response.data;
        		} else {
        			// invalid response
        			return $q.reject(response.data);
        		}
        	}, function(response) {
        			// something went wrong
        			return $q.reject(response.data);
        		}
        	);
        },

        getUser: function(encoded, username) {
        	return $http.get('http://' + ip + ':3000/users/2.json', { headers: { 'Authorization': encoded } })
        	.then(function(response) {
        		if(response.status === 200 && typeof response.data === 'object') {
        			userJson = response.data;
        			return userJson;
        		} else {
        			return $q.reject(response);
        		}
        	}, function(response) {
        			// something went wrong
        			return $q.reject(response);
        		}
        	);
        },

        sendLogin: function(encoded, username) {
        	return $http.get('http://' + ip + ':3000/login', { headers: { 'Authorization': encoded } })
        	.then(function(response) {
        		if(response.status === 200) {
        			return response.data;
        		} else {
        			return $q.reject(response);
        		}
        	}, function(response) {
        			// something went wrong
        			return $q.reject(response);
        		}
        	);	   		
        },

        sendPassword: function(encoded, jsonPassword) {
        	return $http.put('http://' + ip + ':3000/users/' + '2.json', JSON.stringify(jsonPassword), { headers: { 'Authorization': encoded } })
        	.then(function(response){
        		if(response.status === 200 && typeof response.data === 'object') {
        			return response.data;
        		} else {
        			return $q.reject(response);
        		}
        	}, function(response) {
        			// something went wrong
        			return $q.reject(response);
        		}
        	);	   		
        },

       	setUserName: function(user) {
			username = user;
        },

        getUserName: function() {
        	return username;
        },

        getUserJson: function() {
        	return userJson;
        }
    };
});

/*
* Singleton that will provide a cache for server authentication
*/
module.factory('BACache', ['$cacheFactory', function($cacheFactory) {
	return $cacheFactory('BACache', {capacity: 1});
}]);
