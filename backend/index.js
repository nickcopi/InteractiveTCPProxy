const socket = require('./socket');
const api = require('./api');
const db = require('./db');
const webSocket = require('./webSocket');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8090;

const server = http.createServer(app);
webSocket.init(server);

app.use(bodyParser.json());

app.get('/createServer',async (req,res)=>{
	console.log(req.query);
	const {address,port, localPort, protocol} = req.query;
	if(!address || !port || !localPort || !protocol) return res.send({success:false,message:'Invalid request parameters.'});
	await socket.makeServer(address,port,localPort,protocol.toLowerCase());
	res.send({success:true});
});

app.post('/createServer',async (req,res)=>{
	const {address,port, localPort, protocol} = req.body;
	if(!address || !port || !localPort || !protocol) return res.send({success:false,message:'Invalid request parameters.'});
	await socket.makeServer(address,port,localPort,protocol.toLowerCase());
	res.send({success:true});
});

app.get('/getListeners', async (req,res)=>{
	res.send(socket.getListeners());	
});

app.post('/stopListener', async (req,res)=>{
	const {runId} = req.body;
	if(!runId) return res.send({success:false,message:'Invalid request parameters.'});
	res.send(await socket.stopListener(runId));	
});

app.get('/getSessions', async (req,res)=>{
	res.send(await api.getSessions());	
});

app.get('/getLogs', async (req,res)=>{
	const {runId} = req.query;
	if(!runId) return res.send({message:'Invalid request parameters.'});
	res.send(await api.getLogs(runId));	
});

app.get('/isActive', async (req,res)=>{
	res.send({active:socket.active});	
});

app.post('/nameSession', async(req,res)=>{
	const {name, runId} = req.body;
	if(!runId) return res.send({success:false,message:'Invalid request parameters.'});
	res.send(await api.nameSession(name,runId));
});

app.post('/deleteSession', async(req,res)=>{
	const {runId} = req.body;
	if(!runId) return res.send({success:false,message:'Invalid request parameters.'});
	res.send(await api.deleteSession(runId));
});

app.get('/deleteAllSessions', async(req,res)=>{
	res.send(await api.deleteAllSessions());
});

app.post('/nameLog', async(req,res)=>{
	const {name, runId, index} = req.body;
	if(!runId || !('index' in req.body)) return res.send({success:false,message:'Invalid request parameters.'});
	res.send(await api.nameLog(name,runId,index));
});

const init  = async ()=>{
	await db.init();
	server.listen(PORT,()=>{
		console.log(`Listening on ${PORT}`);
	});
}
init();

//socket.makeServer('3.89.63.65',1445);
