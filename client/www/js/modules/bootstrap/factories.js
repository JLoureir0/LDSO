var module = angular.module('starter');
var timeout = 5000;
var ip = "ricardoneves.noip.me";
var username;
var userJson;
var userEncryptedPassword;
var profileToOpen;
var sendMessageUser;

/*
* Singleton that will provide a singleton to make a server request
*/
module.factory('makeRequest', function ($http, $q) {
	return {
		sendTrip: function(json, encoded) {
            return $http.post('http://' + ip + ':3000/trips.json', json, { headers: { 'Authorization': encoded } })
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
            return $http.get('http://' + ip + ':3000/trips.json', {timeout: timeout})
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

        delTrip: function(encoded, id) {
            return $http.delete('http://' + ip + ':3000/trips/' + id + '.json', { headers: { 'Authorization': encoded } })
            .then(function(response) {
                if(response.status === 200) {
                    console.log('tudo bem');
                    return response.data;
                } else {
                    console.log('tudo mal');
                    return $q.reject(response);
                }
            }, function(response) {
                    // something went wrong
                    console.log('mesmo mal');
                    return $q.reject(response);
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
        	return $http.get('http://' + ip + ':3000/users/' + username + '.json', { headers: { 'Authorization': encoded } })
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

        updateUserInfo: function(username, encoded, json) {
            return $http.put('http://' + ip + ':3000/users/' + username + '.json', json, { headers: { 'Authorization': encoded } })
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

        sendPassword: function(username, encoded, jsonPassword) {
        	return $http.put('http://' + ip + ':3000/users/' + username + '.json', JSON.stringify(jsonPassword), { headers: { 'Authorization': encoded } })
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

        setUserEncryptedPassword: function(encryptedPassword) {
            userEncryptedPassword = encryptedPassword;
        },

        getUserEncryptedPassword: function() {
            return userEncryptedPassword;
        },

        getUserJson: function() {
        	return userJson;
        },

        setProfileToOpen: function(username) {
            profileToOpen = username;
        },

        getProfileToOpen: function() {
            return profileToOpen;
        },

        setMessageUser: function(username) {
            sendMessageUser = username;
        },

        getMessageUser: function(username) {
            return sendMessageUser;
        },

        resetMessageUser: function() {
            sendMessageUser = undefined;
        },
        
        resetUserVariables: function() {
            username = undefined;
            userJson = undefined;
        }
    };
});

/*
* Singleton that will provide a cache for server authentication
*/
module.factory('BACache', ['$cacheFactory', function($cacheFactory) {
	return $cacheFactory('BACache', {capacity: 1});
}]);
