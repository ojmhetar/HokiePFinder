
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');


var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/hokiepfinder');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/home', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});
app.get('/found', routes.found);
app.get('/lost', routes.lost);
app.get('/results', routes.results);

app.get('/thanks', routes.thanks);
app.post('/addfound', routes.addfound(db));
app.post('/searchlist', routes.searchlist(db));

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
