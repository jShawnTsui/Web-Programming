var oracle = require("./connectOracle");

exports.do = function(req, res){
    query(res, req.query.u_id);
}

function query(res, u_id) {

  var rowLimit = 10;
  var queryString = "SELECT DISTINCT B.b_name, N.popularity, L.address, " +
    "L.city, L.latitude, L.longitude FROM review R INNER JOIN " + 
    "NORM_BUSINESS N ON R.B_ID = N.B_ID INNER JOIN BUSINESS B ON " +
    "N.B_ID = B.B_ID INNER JOIN LOCATIONS L ON B.B_ID = L.B_ID " +
    "WHERE R.u_id IN (SELECT f_id FROM friend F WHERE F.u_id = '" +
    u_id + "') ORDER BY N.POPULARITY DESC, B.B_NAME ASC";

  console.log(queryString);
  oracle.query(queryString, rowLimit, 
    function(result){
      outputResults(res, result);
  }); 
}

function outputResults(res, result) {
  res.render('friendResults.jade',
    { title: "Friend Results",
      results: result.rows }
  );
}