angular-pusher-test
===================

Angular js (1.2.0) test app for pusher.com.

You need an account on Pusher.com (it's free).
Edit the configuration at the end of app/js/app.js file, setting your pusherAppKey and if you want the options for pusher connection. For exampe:
.constant('configPusher', {
  appKey: 'your apiKye',
  options: {
    authTransport: 'jsonp', //if you connect to a different host
    authEndpoint: 'http://local.git/php-pusher-test/public' //your endpoint
  }
});

