const net = require('net');
const udp = require('dgram');
const Logger = require('./logger');
const Listener = require('./Listener');
const warper = require('./warper');
const socketState = require('./socketState');
let server = null;
let clients = [];
let remoteClients = [];

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


const makeUDPServer = (address,port,localPort)=>{
	return new Promise( async (resolve,reject)=>{
		const runId = Buffer.from(String(Math.random())).toString('hex');
		socketState.runId = runId
		socketState.active = true;
		const logger = new Logger(socketState.runId);
		await logger.init();
		socketState.listeners[runId] = new Listener(address,port,localPort);
		server = udp.createSocket('udp4');
		socketState.listeners[runId].server = server;
		server.on('error',e=>{
			console.error(e);
		});
		server.on('close',()=>{
			console.log('closing udp server');
			socketState.active = false;
			logger.destroy();
			server.unref();
		});
		server.on('message',(msg,info)=>{
			msg = warper.warp(msg);
			logger.log(msg,info.address,info.port,address,port)
			const remoteClient = udp.createSocket('udp4');
			remoteClient.on('message',(remoteMsg,remoteInfo)=>{
				remoteMsg = warper.warp(remoteMsg);
				logger.log(remoteMsg,address,port,info.address,info.port)
				server.send(remoteMsg,info.port,info.address,e=>console.error(e));
			});
			remoteClient.send(msg,port,address,e=>console.error(e));

		});
		server.bind(localPort,()=>{
			resolve();
		});
	});
}

const makeServer = (address,port,localPort)=>{
	return new Promise( async (resolve,reject)=>{
		console.log('opening server');
		const runId = Buffer.from(String(Math.random())).toString('hex');
		socketState.runId = runId
		socketState.active = true;
		const logger = new Logger(socketState.runId);
		await logger.init();
		socketState.listeners[runId] = new Listener(address,port,localPort);
		server = net.createServer((socket) => {
			clients.push(socket);
			socketState.listeners[runId].clients.push(socket);
			const remoteSocket = net.createConnection(Number(port),address, () => {
				remoteClients.push(remoteSocket);
				socketState.listeners[runId].remoteClients.push(socket);
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
					remoteClients = remoteClients.filter(c=>c!==remoteSocket);
					socket.end();
					if(!clients.length && !remoteClients.length) killServer(server);
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
					clients = clients.filter(c=>c!==socket);
					remoteSocket.end();
					if(!clients.length && !remoteClients.length) killServer(server);
				});
			});
		}).on('error', (err) => {
			// Handle errors here.
			console.error(err);
		}).on('close',()=>{
			console.log('closing server');
			socketState.active = false;
			logger.destroy();
			server.unref();
		});
		socketState.listeners[runId].server = server;

		// Grab an arbitrary unused port.
		try{
			server.listen(localPort,() => {
				console.log('opened server on', server.address());
				resolve();
			});
		} catch(e){
			console.error(e);
		}
	})
}
module.exports = {
	getListeners,
	stopListener,
	makeServer,
	makeUDPServer
}
