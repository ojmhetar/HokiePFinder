
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var path = require('path');
var bodyParser = require('body-parser');
var http = require('http');
var sendgrid = require("sendgrid")(process.env.SGUSER, process.env.SGKEY);
var email = new sendgrid.Email();

var Passport = require('./models/Passport.js');

var app = express();

var mongoose = require('mongoose');
mongoose.connect(process.env.DBSOURCE);

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
								var idnum = req.body.idnumber;
								var contactemail = req.body.contactemail;
								var lastnamelost = req.body.lastname;
                passport.idnumber = req.body.idnumber;
                passport.lastname = req.body.lastname;
                //passport.loc = req.body.loc;
                passport.contactemail = req.body.contactemail;
                //passport.contactphone = req.body.contactphone;

								//If this entry already exists in the table, check if it has
								//an owner email, if not, save it.
								Passport.findOne({idnumber: idnum, lastname: lastnamelost}, function(err, entry) {
									if(err) {
										res.send(err);
												}

												if(entry == null) {

													passport.save(function(err){
																	if(err)
																					res.send(err);

																	res.render('entryadded');
													});

												}
												else {

														entry.contactemail = contactemail;
														entry.save(function(err){
																	if(err)
																					res.send(err);
														});


														if (entry.owneremail != null) {

															email.addTo(entry.owneremail);
															email.setFrom("HokiePFinder");
															email.setSubject("Some one has found your passport!");
															email.setHtml("Contact this person: " + contactemail);

															sendgrid.send(email, function(err, json) {
																if (err) {
																	return console.error(err);
																	}
																	console.log(json);
															});
															res.render('entryadded');


														}
														else {
															res.render('entryadded');
														}


												}
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
      var lastnamelost = req.body.lastnamelost;
			var owneremail = req.body.owneremail;
      console.log(idnum);
			Passport.findOne({idnumber: idnum, lastname: lastnamelost}, function(err, entry) {
			if(err) {
				res.send(err);
            }

            if(entry == null) {
							var passport = new Passport();
							passport.idnumber = idnum;
							passport.lastname = lastnamelost;
							passport.owneremail = owneremail;

							passport.save(function(err){
											if(err)
															res.send(err);

										  res.render('notfound');
							});

            }
            else {



							res.render('results', {info: entry});

            }
		});
	});

router.route('/home')
        .get(function(req, res) {
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
