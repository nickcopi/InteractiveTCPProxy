const socket = require('./socket');
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
		return socket.send(JSON.stringify(await actions[body.action](body.args)));
	} catch (e){
		//console.log(e);
		return socket.send(JSON.stringify({error:'Unsupported action or argument.'}));
	}
}


const init = server=>{
	wsServer = new ws.Server({ server });
	wsServer.on('connection', listen);
}

const checkActivity = async args=>{
	return {
		active:socket.active
	}
}

const getAllLogs = async args=>{
	if(socket.active)
		return {
			data: await api.getLogs(socket.runId)
		}
	return {
		error:'No active socket.'
	}
}

const sendMessage = async args=>{

}

const actions = {
	checkActivity,
	getAllLogs,
	sendMessage
}

const alertActive = active=>{
	sockets.forEach(socket=>{
		console.log(`alerting a socket that it is ${active?'':'not'} active.`);
		socket.send(JSON.stringify({action:'alertActive',active}));
	});
}
const alertLog = log=>{

}


module.exports = {
	init,
	alertActive,
	alertLog
}
