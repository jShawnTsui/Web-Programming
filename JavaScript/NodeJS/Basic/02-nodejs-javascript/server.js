var http = require('http');
var module1 = require('./module1');
var module2 = require('./module2');

function requestHandler(request, response) {
	console.log('Hello World!');
	module1.myFunction();
	module2.myFunction();
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write(module1.myString);
	response.write(module2.myString);
	response.end();
}

http.createServer(requestHandler).listen(3000);