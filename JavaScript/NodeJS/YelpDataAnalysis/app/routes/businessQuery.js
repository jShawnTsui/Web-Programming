var oracle = require("./connectOracle");

// Store the results of several querys
var results = new Array;

exports.do = function(req, res){
  query1(res)
}

function query1(res) {
  var rowLimit = 10;
  queryString = 
  "With countBusiness AS(SELECT L.CITY, count(*) AS total FROM business B " +
  "INNER JOIN locations L ON B.b_id = L.b_id GROUP BY L.CITY HAVING count(*) > 100) " +
  "SELECT c1.*, c2.Count_higher_than_4, ROUND((c2.Count_higher_than_4/c1.total),3) " +
  "AS percentage, c3.Count_lower_than_2, ROUND((c3.Count_lower_than_2/c1.total),3) " +
  "AS percentage FROM countBusiness c1 INNER JOIN (SELECT L.CITY, COUNT(B.b_id) " +
  "AS Count_higher_than_4 FROM business B INNER JOIN locations L ON B.b_id = L.b_id " +
  "WHERE B.stars >= 4 GROUP BY L.CITY) c2 ON c1.city = c2.city INNER JOIN " +
  "(SELECT L.CITY, COUNT(B.b_id) AS Count_lower_than_2 FROM business B INNER " +
  "JOIN locations L ON B.b_id = L.b_id WHERE B.stars <= 2 GROUP BY L.CITY) c3 ON " + 
  "c1.city = c3.city ORDER BY TOTAL DESC";

  oracle.query(queryString, rowLimit, 
    function(result){
      res1 = result.rows;
      query2(res);
  });
}

function query2(res, catName) {
  var rowLimit = 10;
  queryString = "SELECT L.city, COUNT(DISTINCT R.u_id) AS NUM FROM review R " +
  "INNER JOIN locations L ON R.b_id = L.b_id GROUP BY L.city ORDER BY NUM DESC";
  oracle.query(queryString, rowLimit, 
    function(result){
      res2 = result.rows;
      outputResults(res, res1, res2);
  }); 
}

function outputResults(res, res1, res2) {
  res.render('business.jade',
    { title: "business",
      res1: res1,
      res2: res2 }
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
