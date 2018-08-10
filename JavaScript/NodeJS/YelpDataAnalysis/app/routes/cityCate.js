var oracle = require("./connectOracle");

var results = new Array;

exports.do = function(req, res){
  if (req.query.catName.length > 0) {
    catName = normalizeInput(req.query.catName);
  }
  city = req.query.city;
  queryTrend(res, city, catName);
}

function queryTrend(res, city, catName) {
  var rowLimit = 36;
  queryString = 
  	"With B_CITY_SUM AS( SELECT YR, QUARTER, CITY, SUM(NUM_BUSINESS) AS " +
  	"BSUM FROM APPITITE_TREND GROUP BY YR, QUARTER, CITY)" +
  	"SELECT A.CITY, A.C_NAME, A.YR, A.QUARTER, " + 
  	"ROUND((A.CAT_COUNT/B.BSUM*100),3) AS PERCENT FROM( SELECT A.YR, " +
  	"A.QUARTER, A.CITY, A.C_NAME, SUM(NUM_BUSINESS) AS CAT_COUNT FROM " +
  	"APPITITE_TREND A WHERE A.city = '" + city + "' AND A.c_name = '" +
  	catName + "' GROUP BY A.CITY, A.C_NAME,A.YR,A.QUARTER) A INNER JOIN " +
  	"B_CITY_SUM B ON B.YR = A.YR AND B.QUARTER = A.QUARTER AND B.CITY = " +
  	"A.CITY ORDER BY A.YR,A.QUARTER, A.C_NAME";
  oracle.query(queryString, rowLimit, 
    function(result){
      resTrend = result.rows;
      queryZipcode(res, city, catName);
  });
}

function queryZipcode(res, city, catName) {
  var rowLimit = 50;
  queryString = "SELECT L.zipcode, avg(popularity), count(distinct C.b_id), " +
  	"avg(population), avg(medium_age), avg(income) FROM demographics D inner " +
  	"join locations L on D.zipcode = L.zipcode inner join categories C on " +
  	"L.b_id = c.b_id inner join norm_business N on C.b_id = N.b_id where " + 
  	"L.city = '" + city + "' AND C.c_name = '" + catName + "' group by " + 
  	"L.zipcode order by avg(population) DESC";
  oracle.query(queryString, rowLimit, 
    function(result){
      resZipcode = result.rows;
      outputResults(res, resTrend, resZipcode);
  }); 
}

function outputResults(res, res1, res2) {
  res.render('cityCate.jade',
    { title: "cityCate",
      resTrend: res1,
      resZipcode: res2 }
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
