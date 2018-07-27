var http = require('http');

function requestHandler(request, response) {
	console.log('Hello World!');
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.write('It worked.');
	response.end();
}

function requestHandler1(req, res) {
	console.log('Hello World!');
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.write('It worked.');
	res.end();
}

function requestHandler2(res, req) {
	console.log('Hello World!');
	req.writeHead(200, {'Content-Type': 'text/plain'});
	req.write('It worked.');
	req.end();
}

http.createServer(requestHandler2).listen(3000);