var http = require('http');

function requestHandler(request, response) {
	console.log('Hello World!');
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('It worked.');
	response.end();
}

http.createServer(requestHandler).listen(3000);