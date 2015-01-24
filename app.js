
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
//mongoose.connect('mongodb://iamking:kingo@ds035260.mongolab.com:35260/mealking');

var router = express.Router(); 

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//Note Needed
app.get('/', routes.index);

router.get('/sample', function(req, res) {
	res.send('this is a sample!');	
});


router.route('/passport')

        .post(function(req, res){
                var passport = new Passport();
                passport.idnumber = req.body.idnumber;
                passport.date = req.body.date;
                passport.loc = req.body.loc;
                passport.contactemail = req.body.contactemail;
                passport.contactphone = req.body.contactphone;

                passport.save(function(err){
                        if(err)
                                res.send(err);

                        res.json({ message: 'Entry Added!' });
                });
        })
        .get(function(req, res) {
                Passport.find(function(err, entries) {
                        if (err)

                        res.json(entries);
                });
});

router.route('/findmine')
	.post(function(req, res) {
		var idnum = req.body.idnum;
        console.log(idnum);
		Passport.findOne({idnumber: idnum}, function(err, entry) {
			if(err) {
				res.send(err); 
            } 

            if(entry == null) {

                res.render('notfound');

            }
            console.log(entry.contactphone);
            //res.render('index', {info: entry});
            res.render('results', {info: entry});
		});
	});

router.route('/home')
        .get(function(req, res) {
            /*var passport = new Passport();
                passport.idnumber = 000000;
                passport.date = "24/23/24";
                passport.loc = "NotFoundYet";
                passport.contactemail = "notfound@gmail.com";
                passport.contactphone = "34590234920";*/
            Passport.find(function(err, entries) {
                if(err)
                    res.send(err); 
                //res.json(entries); 
                res.render('index', {docs: entries});
            });
        });

app.use('/', router); 

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
