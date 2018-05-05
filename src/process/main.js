var http = require('http');

var server = http.createServer(function(req, res) {
	res.writeHead(200, {});
	res.end('foo');
	console.log('http response');
	process.nextTick(function(){
		console.log('tick');
		notFoundFunction();
	});
});
server.listen(8000);

process.on('uncaughtException', function(e) {
	console.log(e);
})