'use strict';

var fs = require('fs'),
	http = require('http'),
	net = require('net');

/**
 * Listen on a socket or port
 * @param {App} app   An express application (or compatible)
 * @param {Number|String} listen   Number will attempt to listen on that port, String will listen on that (absolute) path
 */
module.exports = function(app, listen){
	var server = http.createServer(app);

	if (typeof listen === 'string' || listen instanceof String){
		server.on('error', function(e){
			if (e.code != 'EADDRINUSE'){
				console.error('Unknown error: ', e);
				process.exit(1);
			}

			var clientSocket = new net.Socket();
			clientSocket.on('error', function(e){
				if (e.code == 'EACCES'){
					console.error('Unable to access socket file...');
					process.exit(1);
				}
				if (e.code != 'ECONNREFUSED' && e.code != 'EACCES'){
					console.error('Unknown error: ', e);
					process.exit(1);
				}

				fs.unlinkSync(listen);
				server.listen(listen);
			});

			clientSocket.connect({path: listen}, function(){
				console.error('Socket %s is in use, exiting...', listen);
				process.exit(1);
			});
		});
	} else {
		server.on('error', function(e){
			if (e.code != 'EADDRINUSE'){
				console.error('Unknown error: ', e);
				process.exit(1);
			}

			console.error('Port %d is in use, exiting...', listen);
			process.exit(1);
		});
	}

	server.on('listening', function(){
		if (typeof listen === 'string' || listen instanceof String){
			console.log('Listening on socket %s', listen);
		} else {
			console.log('Listening on port %d', listen);
		}
	});

	server.listen(listen);
};
