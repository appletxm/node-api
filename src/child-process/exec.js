var cp = require('child_process');

var options = {
	encoding: 'utf8',
	timeout: 0,
	maxBuffer: 200 * 1024,
	killSignal: 'SIGTERM',
	setsid: false,
	cwd: 'E:\\test\\project_node\\',
	env: null
};

console.log('child process start....');
cp.exec('ls -l', options, function (e, stdout, stderr) {
	if (!e) {
		console.log(stdout);
		console.log(stderr);
	}
});