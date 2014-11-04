
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path'); 
var bodyParser = require('body-parser'); 
var http = require('http'); 

var Passport = require('./models/Passport.js'); 

var app = express();

var mongoose = require('mongoose'); 
mongoose.connect('mongodb://iamking:kingo@ds035260.mongolab.com:35260/mealking');

var router = express.Router(); 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//DEPRECATED
app.get('/', routes.index);
/*
app.get('/users', user.list);i
app.get('/homeOld', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});
app.get('/found', routes.found);
app.get('/lost', routes.lost);
app.get('/results', routes.results);

app.get('/thanks', routes.thanks);
*/
//DEPRECATED
router.get('/sample', function(req, res) {
	res.send('this is a sample!');	
});


router.route('/passport')

        .post(function(req, res){
                var passport = new Passport();
                passport.idnumber = req.body.idnumber;
                passport.date = req.body.date;
                passport.locationto = req.body.locationto;
                passport.contactemail = req.body.contactemail;
                passport.contactphone = req.body.contactphone;

                recpie.save(function(err){
                        if(err)
                                res.send(err);

                        res.json({ message: 'Entry Added!' });
                });
        })
        .get(function(req, res) {
                Passport.find(function(err, entries) {
                        if (err)
                                res.send(err);

                        res.json(entries);
                });
});

router.route('/findmine')
	.post(function(req, res) {
		var idnum = req.body.idnumber;
		Passport.find(idnum, function(err, entries) {
			if(err)
				res.send(err); 
			res.json(entries); 
		});
	});

router.route('/home')
        .get(function(req, res) {
                res.render('index', { title: 'The index page!' })
        });

app.use('/', router); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
