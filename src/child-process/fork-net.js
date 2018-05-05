const normal = require('child_process').fork('./fork-child.js', ['normal']);
const special = require('child_process').fork('./fork-child.js', ['special']);
// Open up the server and send sockets to child
const server = require('net').createServer();
server.on('connection', (socket) => {
	// If this is special priority

	console.info(process.argv);
	console.info('##################1####################');
	console.info(socket, socket.address());
	console.info('##################2####################');

	if (socket.remoteAddress === '127.0.0.1') {
		special.send('socket', socket);
		return;
	}
	// This is normal priority
	normal.send('socket', socket);
});
server.listen(1337);

console.info('tel net server has bring up at: 1337');
