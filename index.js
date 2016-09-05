var express = require('express');
var app = express();
var http = require('http').Server(app);
global.io = require('socket.io')(http);
var evh = require('express-vhost');

app.set('port', (process.env.PORT || 8080));

app.use(evh.vhost(app.enabled('trust proxy')));

http.listen(app.get('port'), function (){
  console.log('Listening on port ' + app.get('port') + '!');
});

var sites = require('./sites.json');

sites.forEach(function (obj){
  evh.register(obj.domain, require(obj.site));
});
