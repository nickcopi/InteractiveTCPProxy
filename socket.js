const net = require('net');
const logger = require('./logger');
const warper = require('./warper');
let server,nk;
let clients = [];

const killServer = server=>{
	return new Promise((resolve,reject)=>{
		server.close(()=>{
			resolve();
		});
	});
}

const makeServer = (address,port)=>{
	return new Promise( async (resolve,reject)=>{
		if(server){
			clients.forEach(client=>client.destroy());
			clients = [];
			await killServer(server);
		}
		if(nk) nk.destroy();
		server = net.createServer((socket) => {
			clients.push(socket);
			nk =  net.createConnection(Number(port),address, () => {
				nk.on('data',data=>{
					warper.warp(data);
					logger.log(data, socket.remoteAddress, socket.remotePort, nk.remoteAddress, nk.remotePort);
					if(!socket.write(data))
						nk.pause();
				});
				nk.on('drain',()=>{
					socket.resume();
				});
				nk.on('close',()=>{
					socket.end();
				});
				socket.on('data',data=>{
					warper.warp(data);
					logger.log(data,nk.remoteAddress, nk.remotePort, socket.remoteAddress, socket.remotePort);
					if(!nk.write(data))
						socket.pause();

				});
				socket.on('drain',()=>{
					nk.resume();
				});
				socket.on('close',()=>{
					nk.end();
				});
			});
		}).on('error', (err) => {
			// Handle errors here.
			console.error(err);
		}).on('close',()=>{
			server.unref();
		});

		// Grab an arbitrary unused port.
		server.listen(1445,() => {
			console.log('opened server on', server.address());
			resolve();
		});
	})
}
module.exports = {
	makeServer
}
