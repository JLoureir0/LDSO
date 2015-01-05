var module = angular.module('messageModule');

module.controller('messageCtrl', function($scope, $ionicPopup, $state, $stateParams, $ionicLoading, makeRequest, BACache) {

	$scope.destination = "";
	$scope.subject = "";
	$scope.messageContent = "";
	$scope.messages = [];

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

		if(makeRequest.getMessageSubject()) {
			if(!makeRequest.getMessageSubject().match('^Re:'))
				$scope.subject = "Re: " + makeRequest.getMessageSubject();
		}

		makeRequest.resetMessageSubject();

		if(makeRequest.getsendMessageBody())
			$scope.messageContent = '<pre>' + makeRequest.getsendMessageBody() + '</pre>';

		makeRequest.resetMessageBody();
	};

	// redirects to message class
	$scope.contactCreator = function(username, subject, body) {
		makeRequest.setMessageUser(username);
		makeRequest.setMessageSubject(subject);
		makeRequest.setsendMessageBody(body);
		$state.go('menu.edit-message');
	};

	$scope.createMessage = function() {
		$state.transitionTo('menu.edit-message', $stateParams, { reload: true, inherit: false, notify: true });
	}

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
					translateError(error.message);
				});
			}
		}
	}

	function translateError(message) {
		var translated = "";
		console.log("Original error: " + message);

		switch(message){
			case 'Subject must be supplied':
				translated = "Assunto tem que ser especificado";
				break;
			case 'Subject must be a string with a maximum of 30 characters':
				translated = "Assunto pode conter no máximo 30 carateres";
				break;
			case 'Message must be supplied':
				translated = "Corpo da mensagem tem que ser especificada";
				break;
			case 'Message must be a string with a maximum of 500 characters':
				translated = "Corpo da mensagem pode conter no máximo 500 carateres";
				break;
			case 'Receiver must be a valid user':
				translated = "Destinatário inexistente";
				break;
			default:
				translated = "Erro desconhecido";
				break;
		}
		showError(translated);
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

	$scope.loadMessage = function(id) {
		if(BACache.info().size === 0) {
			showError('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {
			$scope.show();
			var username = makeRequest.getUserName();
		    var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
    		var encoded = "Basic " + btoa(username + ':' + userEncryptedPassword);
		
			makeRequest.getCurrentMessage(username, encoded, id).
			// then is called when service comes with an answer
			then(function(data){
				$scope.currentMessage = {
					subject: data.data.subject,
					message: data.data.message,
					sender: data.data.sender,
					receiver: data.data.receiver,
					unread: data.data.unread,
					week_day: data.data.week_day,
					month_day: data.data.month_day,
					month: data.data.month,
					year: data.data.year,
					hour: data.data.hour,
					minute: data.data.minute,
					id: data.data._id
				}

				makeRequest.setMessageToOpen($scope.currentMessage);
				$scope.hide();
				$state.go('menu.message');
			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});   		

		}
	};

	$scope.deleteMessage = function(id) {
		if(BACache.info().size === 0) {
			showError('Não tem sessão iniciada');
			$state.go('menu.login');
		} else {

			var username = makeRequest.getUserName();
		    var userEncryptedPassword = makeRequest.getUserEncryptedPassword();
    		var encoded = "Basic " + btoa(username + ':' + userEncryptedPassword);

			makeRequest.deleteCurrentMesssage(username, encoded, id).
			// then is called when service comes with an answer
			then(function(data) {
				showInfo("Mensagem apagada com sucesso");
				$state.go("menu.messages");
			}, function(error) {
				alert("Erro: " + "Resposta do servidor não recebida");
			});      		
		}
	}

	$scope.back = function() {
		$state.transitionTo('menu.messages', $stateParams, { reload: true, inherit: false, notify: true });
	}

	$scope.getMessage = function() {
		$scope.currentMessage = makeRequest.getMessageToOpen();
	}

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

	$scope.show = function() {
	    $ionicLoading.show({
	      template: 'Aguarde...'
	    });
 	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};
});