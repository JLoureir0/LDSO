var module = angular.module('messageModule');

module.controller('messageCtrl', function($scope, $ionicPopup, $state, makeRequest, BACache) {

	$scope.destination = "";
	$scope.subject = "";
	$scope.messageContent = "";

	$scope.updateEditor = function(keyCode) {
		alert(keyCode);
		if(keyCode == 8 || keyCode == 67) {
			var element = document.getElementById("message-body");
	    	element.style.height = element.scrollHeight - 6 + "px";
		} else if(keyCode == 13){
			var element = document.getElementById("message-body");
	    	element.style.height = element.scrollHeight + 6 + "px";
		}
	};

	$scope.setDestinationAndSubject = function() {
		if(makeRequest.getMessageUser())
			$scope.destination = makeRequest.getMessageUser();

		makeRequest.resetMessageUser();

		if(makeRequest.getMessageSubject())
			$scope.subject = makeRequest.getMessageSubject();

		makeRequest.resetMessageSubject();
	};

	// redirects to message class
	$scope.contactCreator = function(username, subject) {
		makeRequest.setMessageUser(username);
		makeRequest.setMessageSubject(subject);
		$state.go('menu.edit-message');
	};

	$scope.sendMessage = function() {
		if(BACache.info().size === 0) {
			showError('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {
				if($scope.destination === "") {
					showError("Deve preencher no mínimo o destinatário");
				} else {
					var username = makeRequest.getUserName();
				    var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
		    		var encoded = "Basic " + btoa(username + ':' + userEncryptedPassword);

		    		var jsonMessage = {
		    			"subject" : $scope.subject,
		    			"message" : $scope.messageContent 
		    		};
		    		var json = JSON.stringify(jsonMessage);

		    		makeRequest.sendMessage(json, encoded, $scope.destination).
		    		// then is called when service comes with an answer
					then(function(data){
						console.log(data);
						$state.go('menu.messages');
						showInfo("Mensagem enviada com sucesso");
					}, function(error) {
						alert("Erro: " + "Resposta do servidor não recebida");
					});
				}
		}
	}

	$scope.getMyMesssages = function() {
		if(BACache.info().size === 0) {
			showError('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {
			$scope.show();

			var username = makeRequest.getUserName();
		    var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
    		var encoded = "Basic " + btoa(username + ':' + userEncryptedPassword);
			
			makeRequest.getUserMessages(username, encoded).
			// then is called when service comes with an answer
			then(function(data){
				console.log(data);

				$scope.messages = [];
				for(var i = 0; i < data.data.length; i++) {

					var message = [];
					message.subject = data.data[i].subject;
					message.message = data.data[i].message;
					message.sender = data.data[i].sender;
					message.receiver = data.data[i].receiver;
					message.unread = data.data[i].unread;
					message.week_day = data.data[i].week_day;
					message.month_day = data.data[i].month_day;
					message.month = data.data[i].month;
					message.year = data.data[i].year;
					message.hour = data.data[i].hour;
					message.minute = data.data[i].minute;
					message.id = data.data[i]._id;

					$scope.messages.push(message);
				}

				$scope.hide();
			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});
		}
	};

	 // An alert dialog
	function showError(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Erro',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	}

	// An alert dialog
	function showInfo(message) {
	   var alertPopup = $ionicPopup.alert({
	     title: 'Sucesso',
	     template: "<div style='text-align: center'>" + message + "</div>"
	   });
	}

	// An alert dialog
	function showAlert(message, title) {
	   var alertPopup = $ionicPopup.alert({
	     title: title,
	     template: message
	   });
	 }
});