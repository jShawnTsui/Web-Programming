// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'cuixiang',
  password : 'Cxy1059969616',
  database : 'cuixiang'
});

/*
 * GET home page, which is specified in Jade.
 */

exports.do_work = function(req, res){
  res.render('index.jade', { 
	  title: 'Please enter a person login' 
  });
};
exports.do_ref = function(req, res){
  res.render('reference.jade', {});
};

exports.do_mywork = function(req, res){
  query = "SELECT DISTINCT login FROM Family";

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.render('mywork.jade', { 
	  	title: 'Please enter a family login',
	  	results: rows
  	  });
    }
  });
  
};