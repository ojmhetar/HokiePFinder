
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.found = function(req, res){
  res.render('found', { });
};

exports.lost = function(req, res){
  res.render('lost', { });
};

exports.results = function(req, res){
  res.render('results', { });
};

exports.thanks = function(req, res){
  res.render('thanks', { });
};

exports.addfound = function(db) {
    return function(req, res) {

        // Get our form values. These rely on the "name" attributes
        var idNumber = req.body.idnumber;
        var studentName = req.body.studentname;
        var returnLocation = req.body.returnlocation; 
        var finderEmail = req.body.findemail; 

        var collection = db.get('found');

        collection.insert({
            "idnumber" : idNumber,
            "studentname" : studentName,
            "finderemail" : finderEmail,
            "returnlocation" : returnLocation
        }, function (err, doc) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            }
            else {
                res.location("thanks");
                res.redirect("thanks");
            }
        });

    }
}

exports.searchlist = function(db) {
    return function(req, res) {

    	var idNumber = req.body.idnumber;

        var collection = db.get('found');

        collection.find({"idnumber": idNumber }, {}, function(e,docs){
            res.render('results', {
                "result" : docs
            });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
        });
    };
};