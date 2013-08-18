var mwcCore = require('mwc_kernel'),
  captcha = require('captcha'),
  express = require('express'),
  path = require('path'),
  async = require('async'),
  util = require('util'),
  ENV = process.env.NODE_ENV || 'development',
  config = require('yaml-config').readConfig(__dirname + '/../config/config.yaml', ENV);

config.emailConfig = process.env.EMAIL_CONFIG;

//setting up the config
var MWC = mwcCore(config);


MWC.extendApp(function(core){
  core.app.locals.delimiters = '[[ ]]';
});


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
  core.app.get('/', function(req, res){
    //TODO: escape "/> in json
    var user = JSON.parse(JSON.stringify(req.user || {}));
    delete user.password;
    delete user.salt;
    delete user.apiKey;
    res.render('angular', {layout:'angular_layout', user: JSON.stringify(user)})
  });

});
MWC.start();


