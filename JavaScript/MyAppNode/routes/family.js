// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'cuixiang',
  password : 'Cxy1059969616',
  database : 'cuixiang'
});

/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res, login) {
	query = "SELECT p.login, p.name, f.role, p.sex, p.relationshipStatus, p.birthyear FROM Person p, Family f WHERE f.login='"+login+"' AND f.member = p.login";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_family(res, login, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_family(res,login,results) {
	res.render('family.jade',
		   { title: "Family with login " + login,
		     results: results }
	  );
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
