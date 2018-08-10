var oracle = require("./connectOracle");

var results = new Array;

exports.do = function(req, res){
  if (req.query.city.length > 0) {
    city = normalizeInput(req.query.city);
  }
  queryCityInfo(res, city);
}

function queryCityInfo(res, city) {
  var rowLimit = 1;
  queryString = "select L.city, count(distinct L.b_id), count(distinct i_id), "
    + "COUNT(DISTINCT R.u_id), avg(income), avg(medium_age)"
    + "From locations L INNER JOIN review R ON R.b_id = L.b_id INNER JOIN " + 
    "Institutions I ON L.zipcode = I.zipcode INNER JOIN demographics D ON " + 
    "L.zipcode = D.zipcode Where L.city = '" + city + "' GROUP BY L.city";
  
  oracle.query(queryString, rowLimit, 
    function(result){
      resInfo = result.rows;
      queryRating1(res, city);
  });
}

function queryRating1(res, city) {
  var rowLimit = 1;
  queryString = "SELECT COUNT(B.b_id) AS NUM FROM business B INNER JOIN " + 
    "locations L ON B.b_id = L.b_id WHERE B.stars >= 4 and L.city = '" + city 
    + "'";
  oracle.query(queryString, rowLimit, 
    function(result){
      resRating1 = result.rows;
      queryRating2(res, city);
  }); 
}

function queryRating2(res, city) {
  var rowLimit = 1;
  queryString = "SELECT COUNT(B.b_id) AS NUM FROM business B INNER JOIN " + 
    "locations L ON B.b_id = L.b_id WHERE B.stars <= 2 and L.city = '" + city 
    + "'";
  oracle.query(queryString, rowLimit, 
    function(result){
      resRating2 = result.rows;
      queryRating3(res, city);
  }); 
}

function queryRating3(res, city) {
  var rowLimit = 1;
  queryString = "SELECT COUNT(B.b_id) AS NUM FROM business B INNER JOIN " + 
    "locations L ON B.b_id = L.b_id WHERE B.stars > 2 and B.stars < 4 AND " + 
    "L.city = '" + city + "'";
  oracle.query(queryString, rowLimit, 
    function(result){
      resRating3 = result.rows;
      queryCats(res, city);
  }); 
}

function queryCats(res, city) {
  var rowLimit = 30;
  queryString = "SELECT C.c_name, ROUND(AVG(B.popularity),3) AS avg_popularity "
  + "FROM CATEGORIES C INNER JOIN norm_business B ON C.b_id = B.b_id INNER " + 
  "JOIN locations L ON C.b_id = L.b_id WHERE L.city = '" + city + "' GROUP BY "
  + "C.c_name ORDER BY avg_popularity DESC";

  oracle.query(queryString, rowLimit, 
    function(result){
      resCats = result.rows;
      outputResults(res, resInfo, resRating1, resRating2, resRating3, resCats);
  }); 
}

function outputResults(res, res1, res2, res3, res4, res5) {
  res.render('city.jade',
    { title: "city information",
      resInfo: res1,
      resRating1: res2,
      resRating2: res3,
      resRating3: res4,
      resCats: res5 }
  );
}

// Normalizes the input of a user to be used in SQL query string
function normalizeInput(input) {
  var lower = input.toLowerCase();
  var words = lower.split(" ");
  var newWords = [];
  var normalized = ""
  for (var i = 0; i < words.length; i++) {
    newWords[i] = words[i].replace(words[i][0], words[i][0].toUpperCase());
    if (i == 0) {
      normalized = newWords[0];
    }
    else normalized = normalized.concat(" ", newWords[i]);
  }
  return normalized
}
