var mwcCore = require('mwc_kernel'),
  captcha = require('captcha'),
  express = require('express'),
  path = require('path'),
  async = require('async');

//setting up the config
var MWC = mwcCore({
  'hostUrl':'http://localhost:3000/', //'http://mwcwelcome.herokuapp.com/',
  'mongoUrl': 'mongodb://localhost/mwc_plugin_welcome_dev',
  port: 3000,
  'secret': ((process.env.secret)?(process.env.secret):'lAAAAalalala1'),
  'emailConfig':((process.env.emailConfig)?(process.env.emailConfig):'myemail@gmail.com:1234567'),
  "passport":{
    "GITHUB_CLIENT_ID":"--insert-github-consumer-key-here--",
    "GITHUB_CLIENT_SECRET": "--insert-github-consumer-secret-here--",
    "TWITTER_CONSUMER_KEY":"--insert-twitter-consumer-key-here--",
    "TWITTER_CONSUMER_SECRET": "--insert-twitter-consumer-secret-here--",
    "FACEBOOK_APP_ID":"--insert-facebook-app-id-here--",
    "FACEBOOK_APP_SECRET":"--insert-facebook-app-secret-here--"
  }
});

MWC.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});
//MWC.usePlugin(require('mwc_plugin_notify_by_email'));
MWC.usePlugin(require('mwc_plugin_hogan_express'));


MWC.extendMiddleware(function(core){
  return captcha({ url: '/captcha.jpg', color:'#0064cd', background: 'rgb(20,30,200)' }); // captcha params
});

MWC.extendMiddleware(function(core){
  return express.static(path.join(__dirname, 'public'));
});

MWC.extendMiddleware( function(core){
  return function(req, res, next) {
    res.cookie('XSRF-TOKEN', req.session._csrf);
    next();
  }
});

MWC.usePlugin(require('./../index.js'));
MWC.extendRoutes(function (core) {
  core.app.get('/', function (request, response) {
    response.render('index',{userAgent:request.headers['user-agent']})
  });

  core.app.get('/my', function (request, response) {
    if (request.is('json')) {
      response.json(request.user)
    } else {
      response.render('my', {user: request.user});
    }
  });

  core.app.get('/team', function (request, response) {
    request.model.Users.find({}, function (err, users) {
      if (err) {
        throw err;
      }
      if (request.query['json']) {
        response.json(users);
      } else {
        response.render('team', {users: users});
      }
    });
  });

  core.app.get('/angular', function(req, res){
    res.render('angular', {layout:'angular_layout'})
  });

});
MWC.start();

MWC.on('notify',function(message){
  console.log(message);
});

