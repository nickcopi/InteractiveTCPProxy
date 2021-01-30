const net = require('net');
const Logger = require('./logger');
const warper = require('./warper');
let server,nk;
let clients = [];
let remoteClients = [];

const killServer = server=>{
	return new Promise((resolve,reject)=>{
		server.close(()=>{
			resolve();
		});
	});
}

const makeServer = (address,port)=>{
	return new Promise( async (resolve,reject)=>{
		console.log('opening server');
		if(server){
			clients.forEach(client=>client.destroy());
			clients = [];
			await killServer(server);
		}
		if(nk) nk.destroy();
		module.exports.runId = Buffer.from(String(Math.random())).toString('hex')
		module.exports.active = true;
		const logger = new Logger(module.exports.runId);
		await logger.init();
		server = net.createServer((socket) => {
			clients.push(socket);
			const nk =  net.createConnection(Number(port),address, () => {
			remoteClients.push(nk);
				nk.on('data',data=>{
					data = warper.warp(data);
					logger.log(data, nk.remoteAddress, nk.remotePort, socket.remoteAddress, socket.remotePort);
					if(!socket.write(data))
						nk.pause();
				});
				nk.on('drain',()=>{
					socket.resume();
				});
				nk.on('close',()=>{
					remoteClients = remoteClients.filter(c=>c!==nk);
					socket.end();
					if(!clients.length && !remoteClients.length) killServer(server);
				});
				socket.on('data',data=>{
					data = warper.warp(data);
					logger.log(data,socket.remoteAddress, socket.remotePort, nk.remoteAddress, nk.remotePort);
					if(!nk.write(data))
						socket.pause();

				});
				socket.on('drain',()=>{
					nk.resume();
				});
				socket.on('close',()=>{
					clients = clients.filter(c=>c!==socket);
					nk.end();
					if(!clients.length && !remoteClients.length) killServer(server);
				});
			});
		}).on('error', (err) => {
			// Handle errors here.
			console.error(err);
		}).on('close',()=>{
			console.log('closing server');
			module.exports.active = false;
			logger.destroy();
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
	makeServer,
	active:false,
	runId:''
}
