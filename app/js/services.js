'use strict';

/* Services */
angular.module('myApp.services', [])
.factory('pusherTester', function (configPusher) {
	// Enable pusher logging - don't include this in production
	var baseFactory = { 
			channel: false,
			channelName: "testchannel",
			presenceChannel: false,
			presenceChannelName: "testpresence",
			pusher: false,
			online: true
	};

	//start the app
	baseFactory.build = function() {
		Pusher.log = function(message) {
			if (window.console && window.console.log) {
				window.console.log(message);
			}
		};
		//new pusher with config
		baseFactory.pusher = new Pusher(configPusher.appKey, configPusher.options);
	};

	//subscribe tot he channel
	baseFactory.subscribe = function(privateCallback, presenceCallback, presenceMemberAddedCallback, presenceMemberRemovedCallback) {
		
		baseFactory.channel = baseFactory.pusher.subscribe('private-' +  baseFactory.channelName);
		//if okay set the user online
		baseFactory.channel.bind('pusher:subscription_succeeded', function() {
			baseFactory.online = true;
		}); 
		//if not okay set offline
		baseFactory.channel.bind('pusher:subscription_error', function(status) {
			baseFactory.online = false;
		});
		//get messages from private channel
		baseFactory.channel.bind('client-testevent', privateCallback);
		
		baseFactory.presenceChannel = baseFactory.pusher.subscribe('presence-' + baseFactory.presenceChannelName);
		baseFactory.presenceChannel.bind('pusher:subscription_succeeded', presenceCallback);
		baseFactory.presenceChannel.bind('pusher:member_added', presenceMemberAddedCallback);
		baseFactory.presenceChannel.bind('pusher:member_removed', presenceMemberRemovedCallback);
		
	};

	//send data over private channel
	baseFactory.send = function(data) {
		if(baseFactory.online) {
			baseFactory.channel.trigger('client-testevent', { data: data });
		}
	};
	return baseFactory;
})
;

