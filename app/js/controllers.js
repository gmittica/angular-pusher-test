'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, pusherTester) {
	  
	  $scope.lastTimestamp = 0;
	  $scope.username = "";
	  $scope.messages = [];
	  $scope.members = 0;
	  $scope.online = false;
	  
	  
	  //callback for mesasges got from pusher on private channel
	  $scope.privateCallback = function(response) {
		  var message = response.data;
		  //set the duration if the message is a reply
		  if(message.type == 'reply') {
			  message.duration = "after " + (new Date().getTime() - $scope.lastTimestamp) / 1000 + "''";
		  }
		  //else don't
		  else {
			  message.duration = "";
		  }
		  $scope.messages.unshift(message);
		  $scope.$apply();
		  //send a reply if the message is a ping
		  if(message.type == 'ping') {
			  $scope.send('reply');
		  }
	  };
	  
	  //callback for successeful login into presence channel
	  $scope.presenceCallback = function(members) {
		  $scope.online = true;
		  $scope.members = members.count;
		  $scope.$apply();
	  };
	  
	  //callback for new member logged into presence channel
	  $scope.presenceMemberAddedCallback = function(member) {
		  $scope.members++;
		  $scope.$apply();
	  };
	  
	  //callback for new member logged out
	  $scope.presenceMemberRemovedCallback = function(member) {
		  $scope.members--;
		  $scope.$apply();
	  };
	  
	  //connect to pusher
	  $scope.connect = function() {
		  pusherTester.build();
		  //subscribe and goes online pushing the callback for all events
		  pusherTester.subscribe($scope.privateCallback, $scope.presenceCallback, $scope.presenceMemberAddedCallback,  $scope.presenceMemberRemovedCallback);
	  };
	  
	  //send a mesasge with min username and timestamp
	  $scope.send = function(type) {
		  $scope.lastTimestamp = new Date().getTime();
		  var message = {
				  type: type,
				  username : $scope.username
		  };
		  pusherTester.send(message);
		  //if ping message send a response
		  if(message.type == "ping") {
			  $scope.messages.push(message);
		  }
	  };

  })
  
;;