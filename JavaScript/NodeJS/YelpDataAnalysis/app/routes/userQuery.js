var oracle = require("./connectOracle");

exports.do = function(req, res){
    query(res, req.query.alcohol, req.query.crdt_card, req.query.catName,
      req.query.latitude, req.query.longitude);
}

function query(res, alcohol, crdt_card, catName, lat, lng) {
  if (catName.length > 0) catName = normalizeInput(catName);
  var rowLimit = 15;
  var queryString = "WITH distances AS (SELECT b_id, ROUND(sqrt((((" + lng + 
  "-LONGITUDE)*ACOS(-1)*12656*cos(((" + lng + 
  "+LONGITUDE)/2)*ACOS(-1)/180)/180)*((" + lng + 
  "-LONGITUDE)*ACOS(-1)*12656*cos (((" + lng + 
  "+LONGITUDE)/2)*ACOS(-1)/180)/180)) + (((" + lat + 
  "-LATITUDE)*ACOS(-1)*12656/180) * ((" + lat + 
  "-LATITUDE)*ACOS(-1)*12656/180))),3) AS distance FROM locations ORDER BY " +
  "DISTANCE) SELECT distinct b_name, stars, review_count, address, city, " + 
  "latitude, longitude, distance FROM distances D INNER JOIN users_view U " +
  "ON U.b_id= D.b_id ";
  if (catName != "") {
    queryString += "INNER JOIN CATEGORIES C ON U.b_id = C.b_id WHERE c_name = '" + 
      catName + "' ";
  }
  else queryString += "WHERE 1 = 1 ";
  if (alcohol){
    queryString += "AND alcohol = 'TRUE' ";
  }
  if (crdt_card){
    queryString += "AND crdt_card = 'TRUE' ";
  }
  queryString += "ORDER BY distance, b_name";

  oracle.query(queryString, rowLimit, 
    function(result){
      outputResults(res, result);
  }); 
}

function outputResults(res, result) {
  res.render('userResults.jade',
    { title: "User Results",
      results: result.rows }
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