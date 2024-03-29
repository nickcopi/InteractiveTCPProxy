const socketState = require('./socketState');
const api = require('./api');
const ws = require('ws');

let wsServer;
let sockets = [];


const listen = socket => {
	sockets.push(socket);
	socket.on('message', async message => await handleMessage(socket,message));
	socket.on('close',()=>{
		sockets = sockets.filter(s=>s!==socket);
	});
}

const handleMessage = async (socket,message)=>{
	let body;
	try {
		body = JSON.parse(message);
	} catch (e){
		return socket.send(JSON.stringify({error:'Message not sent in JSON format.'}));
	}
	try {
		return socket.send(JSON.stringify(await actions[body.action](body.args,socket)));
	} catch (e){
		console.log(e);
		return socket.send(JSON.stringify({error:'Unsupported action or argument.'}));
	}
}


const init = server=>{
	wsServer = new ws.Server({ server });
	wsServer.on('connection', listen);
}

const getListeners = async args=>{
	return {
		action:'receiveListeners',
		listeners: Object.entries(socketState.listeners).map(([k,v])=>{
			return {
				runId: k,
				...(v.connectionInfo)
			}
		})
	}
}

const getAllLogs = async (args,socket)=>{
	console.log(args);
	if(socketState.listeners[args.runId]){
		socket.runId = args.runId;
		return {
			logs: await api.getLogs(args.runId),
			action: 'receiveLogs'
		}
	}
	return {
		error:'No active socket.'
	}
}

const sendMessage = async args=>{

}

const actions = {
	getListeners,
	getAllLogs,
	sendMessage
}

const alertActive = async active=>{
	await Promise.all(sockets.map(async socket=>{
		socket.send(JSON.stringify(await getListeners()));
	}));
}
const alertLog = (log,runId)=>{
	sockets.forEach(socket=>{
		if(socket.runId === runId)
			socket.send(JSON.stringify({action:'receiveNewLog',log:log}));
	});
	
}


module.exports = {
	init,
	alertActive,
	alertLog
}
