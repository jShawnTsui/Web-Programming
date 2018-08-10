var oracle = require("./connectOracle");

var results = new Array;

exports.do = function(req, res){
  if (req.query.catName.length > 0) {
    catName = normalizeInput(req.query.catName);
  }
  queryGeneral(res, catName);
}

function queryGeneral(res, catName) {
  var rowLimit = 1;
  queryString = "SELECT c_name, count(distinct b_id), avg(popularity) " + 
    "FROM categories NATURAL JOIN norm_business WHERE c_name = '" + 
    catName + "' GROUP BY c_name";
  oracle.query(queryString, rowLimit, 
    function(result){
      resGeneral = result.rows;
      queryStates(res, catName);
  });
}

function queryStates(res, catName) {
  var rowLimit = 100;
  queryString = "SELECT city, count(distinct b_id), avg(popularity) " + 
    "FROM categories NATURAL JOIN norm_business NATURAL JOIN locations " + 
    "WHERE c_name = '" + catName + "' GROUP BY city ORDER BY city";
  oracle.query(queryString, rowLimit, 
    function(result){
      resState = result.rows;
      outputResults(res, resGeneral, resState);
  }); 
}

function outputResults(res, res1, res2) {
  res.render('category.jade',
    { title: "category",
      resGeneral: res1,
      resState: res2 }
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
