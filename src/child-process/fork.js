const http = require('http');
const cp = require('child_process');
const url = require('url');

const server = http.createServer((req, res) => {
	var child = cp.fork(__dirname + '/fork-cal.js'),
		inputCount = 1;

	//每个请求都单独生成一个新的子进程
	child.on('message',(m) => {
		res.end('{"result": ' + m.result + '}');
	});

	//为其指定message事件
	//console.info(url.parse(req.url), url.parse(req.headers.referer));
	if(url.parse(req.url).query && url.parse(req.url).query.indexOf('input=') >= 0){
		inputCount = url.parse(req.url).query.split('=')[1];
	}
	//和postMessage很类似，不过这里是通过send方法而不是postMessage方法来完成的
	child.send({input : inputCount||1});
});
server.listen(8000); 