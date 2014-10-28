var module = angular.module('starter');

module.factory('makeRequest', function ($http, $q) {
	return {
		sendTrip: function(json) {
	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.post('http://localhost:3000/trip', json)
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
	            // the $http API is based on the deferred/promise APIs exposed by the $q service
	            // so it returns a promise for us by default
	            return $http.get('http://localhost:3000/trip')
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
	        	return $http.post('http://localhost:3000/user', json)
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
	        	return $http.get("http://api.geonames.org/findNearbyJSON?lat=" + latitude + "&lng=" + longitude + "&username=ldso_14")
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
);