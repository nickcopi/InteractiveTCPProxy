const net = require('net');
const udp = require('dgram');
const Logger = require('./logger');
const Listener = require('./Listener');
const warper = require('./warper');
const socketState = require('./socketState');
let server = null;

const killServer = server=>{
	return new Promise((resolve,reject)=>{
		server.close(()=>{
			resolve();
		});
	});
}

/*
 * server - our local server binding a local port - the face of the proxy
 * remoteSocket - the remote socket that gets created each time a client connects to our proxy
 * clients[] - local end of each client paired to a remote socket
 * remoteClients[] - list of all remoteSockets
 * */

const stopListener = async runId =>{
	const listener = socketState.listeners[runId];
	if(listener){
		listener.clients.forEach(client=>client.destroy());
		listener.clients = [];
		if(listener.connectionInfo.protocol === 'udp')
			await Promise.all(listener.remoteClients.map(async rc=> await killServer(rc)));
		await killServer(listener.server);
		delete socketState.listeners[runId];
		return {
			success: true
		}
	}
	return {
		success: false
	}
}

const getListeners = ()=>{
	return Object.entries(socketState.listeners).map(([k,v])=>{
		return {
			runId: k,
			...(v.connectionInfo)
		}
	});
}


const makeUDPServer = (address,port,localPort,runId,listener,logger)=>{
	return new Promise( async (resolve,reject)=>{
		server = udp.createSocket('udp4');
		listener.server = server;
		server.on('error',async err=>{
			if(err.errno === 'EADDRINUSE'){
				console.log(`force killing ${runId}`);
				await stopListener(runId);
				resolve({
					success:false,
					message:`Failed to bind port ${localPort}.`
				});
			} else console.error(err);
		});
		server.on('close',async()=>{
			console.log('closing udp server');
			socketState.active = false;
			await logger.destroy();
			server.unref();
		});
		server.on('message',(msg,info)=>{
			msg = warper.warp(msg);
			logger.log(msg,info.address,info.port,address,port)
			remoteClient = udp.createSocket('udp4');
			listener.remoteClients.push(remoteClient);
			remoteClient.on('message',(remoteMsg,remoteInfo)=>{
				remoteMsg = warper.warp(remoteMsg);
				logger.log(remoteMsg,address,port,info.address,info.port)
				server.send(remoteMsg,info.port,info.address,e=>console.error(e));
			});
			remoteClient.on('close',()=>{
				remoteClient.unref();
			});
			remoteClient.send(msg,port,address,e=>console.error(e));

		});
		server.bind(localPort,()=>{
			console.log('opened udp server on', server.address());
			resolve({success:true});
		});
	});
}

const makeTCPServer = (address,port,localPort,runId,listener,logger)=>{
	return new Promise( async (resolve,reject)=>{
		server = net.createServer((socket) => {
			listener.clients.push(socket);
			const remoteSocket = net.createConnection(Number(port),address, () => {
				listener.remoteClients.push(socket);
				remoteSocket.on('data',data=>{
					data = warper.warp(data);
					logger.log(data, remoteSocket.remoteAddress, remoteSocket.remotePort, socket.remoteAddress, socket.remotePort);
					if(!socket.write(data))
						remoteSocket.pause();
				});
				remoteSocket.on('drain',()=>{
					socket.resume();
				});
				remoteSocket.on('close',()=>{
					listener.remoteClients = listener.remoteClients.filter(c=>c!==remoteSocket);
					socket.end();
					//if(!listener.clients.length && !listener.remoteClients.length) killServer(server);
				});
				socket.on('data',data=>{
					data = warper.warp(data);
					logger.log(data,socket.remoteAddress, socket.remotePort, remoteSocket.remoteAddress, remoteSocket.remotePort);
					if(!remoteSocket.write(data))
						socket.pause();

				});
				socket.on('drain',()=>{
					remoteSocket.resume();
				});
				socket.on('close',()=>{
					listener.clients = listener.clients.filter(c=>c!==socket);
					remoteSocket.end();
					//if(!clients.length && !remoteClients.length) killServer(server);
				});
			});
		}).on('error', async (err) => {
			// Handle errors here.
			if(err.errno === 'EADDRINUSE'){
				console.log(`force killing ${runId}`);
				await stopListener(runId);
				resolve({
					success:false,
					message:`Failed to bind port ${localPort}.`
				});
			} else console.error(err);
		}).on('close',async ()=>{
			console.log('closing server');
			socketState.active = false;
			await logger.destroy();
			server.unref();
		});
		listener.server = server;

		// Grab an arbitrary unused port.
		server.listen(localPort,() => {
			console.log('opened tcp server on', server.address());
			resolve({success:true});
		});
	});
}

const makeServer = async (address,port,localPort,protocol)=>{
	console.log('opening server');
	const runId = Buffer.from(String(Math.random())).toString('hex');
	socketState.runId = runId
	socketState.active = true;
	const listener = new Listener(address,port,localPort, protocol);
	socketState.listeners[runId] = listener;
	const logger = new Logger(socketState.runId);
	await logger.init();
	switch(protocol){
		case 'tcp':
			return await makeTCPServer(address, port, localPort, runId, listener, logger);
		case 'udp':
			return await makeUDPServer(address, port, localPort, runId, listener, logger);
		default:
			return {
				success:false, 
				message:`Unknown protocol ${protocol}`
			}
	}
}
module.exports = {
	getListeners,
	stopListener,
	makeServer
}
