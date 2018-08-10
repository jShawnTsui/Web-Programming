// Connects to Oracle DB

var oracledb = require('oracledb');  

exports.query = function(queryString, rowLimit, callback){

  // Max row returned.
  oracledb.maxRows = rowLimit; 
  oracledb.getConnection({  
    user: "cis550group7",  
    password: "cis550group7",  
    connectString: "cis550group7.cxcbax6sj7uo.us-east-1.rds.amazonaws.com/yelpdb"  
    }, 
    function(err, connection) {  
      if (err) {  
        console.error(err.message);  
        return;  
      }

    console.log("\nQuery: " + queryString);
    connection.execute(queryString, [], //blind value in []
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      callback(result);
      doRelease(connection);
    });
  });
}

//Releases connection
function doRelease(connection) {
  connection.release(  
      function(err) {  
        if (err) 
          console.error(err.message);  
      }  
   );  
}  