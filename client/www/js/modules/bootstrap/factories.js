var module = angular.module('starter');


var timeout = 5000;

/*
* Singleton that will provide a singleton to make a server request
*/
module.factory('makeRequest', ['$cacheFactory', function ($http, $q) {
	return {
		sendTrip: function(json) {
	            return $http.post('http://localhost:3000/trip', json, {timeout: timeout})
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
	            return $http.get('http://localhost:3000/trip', {timeout: timeout})
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
	        	return $http.post('http://localhost:3000/user', json, {timeout: timeout})
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

	        sendLogin: function(encoded) {
	        	return $http.get("http://localhost:3000/users.json", { headers: { 'Authorization': encoded } })
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
	        }
	    };    
	}
]);


/*
* Singleton that will provide a cache for server authentication
*/
module.factory('BACache', ['$cacheFactory', function($cacheFactory){
	return $cacheFactory('BACache', {capacity: 1});
}]);