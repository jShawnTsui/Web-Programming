// Connect string to MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'fling.seas.upenn.edu',
  user     : 'cuixiang',
  password : 'Cxy1059969616',
  database : 'cuixiang'
});

function myMap() {
var mapOptions = {
    center: new google.maps.LatLng(39.95174688915416, -75.1910663097153),
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.HYBRID
}
var map = new google.maps.Map(document.getElementById("map"), mapOptions);
var marker  = new google.maps.Marker({position: new google.maps.LatLng(40.95174688915416, -75.1910663097153)});
marker.setMap(map);
}

/////
// Query the oracle database, and call output_actors on the results
//
// res = HTTP result object sent back to the client
// name = Name to query for
function query_db(res, login) {
	query = "SELECT p.*, count(DISTINCT f.friend) AS num_friends FROM Person p LEFT JOIN Friends f ON p.login = f.login GROUP BY p.login ";
	if (login) query = query + "HAVING p.login='" + login + "' ";
	connection.query(query, function(err, rows, fields) {
		if (err) console.log(err);
		else {
			output_persons(res, login, rows);
		}
	});
}

// ///
// Given a set of query results, output a table
//
// res = HTTP result object sent back to the client
// name = Name to query for
// results = List object of query results
function output_persons(res,login,results) {
	res.render('person.jade',
		   { title: "Person with login " + login,
		     results: results }
	  );
	myMap();
}

/////
// This is what's called by the main app 
exports.do_work = function(req, res){
	query_db(res,req.query.name);
};
