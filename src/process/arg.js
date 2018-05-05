var http = require('http');
var args = process.argv;

console.info(args);
console.info(process.version);
console.info(process.platform);
console.info(process.pid);

var server = http.createServer(function(req, res) {
	res.writeHead(200, {});
	res.end('foo');
	console.log('http response');
});
server.listen(args[2]||8000);
console.log('server bring up on port', args[2]||800);