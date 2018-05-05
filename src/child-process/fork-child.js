process.on('message', (m, socket) => {
	if (m === 'socket') {
		socket.end(`Request handled with ${process.argv[2]} priority`);
	}
}); 